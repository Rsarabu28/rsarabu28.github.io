import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { verifyPlanner } from "./verify-planner.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const server = await createServer({
  root,
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const { projects } = await server.ssrLoadModule("/src/content.ts");
  const kinematics = await server.ssrLoadModule("/src/kinematics.ts");
  const { solveArm } = kinematics;
  const routes = [
    "/",
    "/experience",
    "/projects",
    "/about",
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  for (const route of routes) {
    const markup = renderToStaticMarkup(
      React.createElement(
        MemoryRouter,
        { initialEntries: [route] },
        React.createElement(App),
      ),
    );
    assert.equal(
      (markup.match(/<h1[ >]/g) || []).length,
      1,
      `${route}: exactly one primary heading`,
    );
    assert.match(markup, /id="main"/, `${route}: main landmark exists`);
    assert.doesNotMatch(
      markup,
      /NaN|undefined|PAGE NOT FOUND|—/,
      `${route}: valid content`,
    );
    for (const match of markup.matchAll(/(?:src|href|poster)="(\/[^"#?]*)"/g)) {
      const target = match[1];
      if (routes.includes(target)) continue;
      assert.ok(
        existsSync(path.join(root, "public", target)),
        `${route}: asset exists: ${target}`,
      );
    }
    for (const match of markup.matchAll(/href="(\/projects\/[^"#?]*)"/g)) {
      assert.ok(
        routes.includes(match[1]),
        `${route}: project link resolves: ${match[1]}`,
      );
    }
  }
  const missing = renderToStaticMarkup(
    React.createElement(
      MemoryRouter,
      { initialEntries: ["/missing"] },
      React.createElement(App),
    ),
  );
  assert.match(
    missing,
    /PAGE NOT FOUND/,
    "unknown routes show recovery navigation",
  );
  for (const target of [
    { x: 132, y: 126 },
    { x: -100, y: 142 },
    { x: 170, y: 48 },
    { x: 0, y: 0 },
    { x: 1000, y: 1000 },
    { x: -1000, y: 40 },
  ]) {
    const { end, elbow, a1, a2 } = solveArm(target);
    assert.ok(
      [end.x, end.y, elbow.x, elbow.y, a1, a2].every(Number.isFinite),
      "finite solutions, including singular/unreachable inputs",
    );
    assert.ok(
      Math.abs(Math.hypot(elbow.x, elbow.y) - 118) < 1e-8,
      "first link length is preserved",
    );
    assert.ok(
      Math.abs(Math.hypot(end.x - elbow.x, end.y - elbow.y) - 112) < 1e-8,
      "second link length is preserved",
    );
    assert.ok(
      Math.abs(118 * Math.cos(a1) + 112 * Math.cos(a1 + a2) - end.x) < 1e-7,
      "FK reproduces solved X",
    );
    assert.ok(
      Math.abs(118 * Math.sin(a1) + 112 * Math.sin(a1 + a2) - end.y) < 1e-7,
      "FK reproduces solved Y",
    );
  }
  assert.throws(() => solveArm({ x: NaN, y: 0 }), RangeError);
  verifyPlanner(kinematics);
  console.log(
    `Verified ${routes.length} routes, project links, local media, fallback page, and IK geometry.`,
  );
} finally {
  await server.close();
}
