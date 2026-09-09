# Ray Sarabu's robotics portfolio

A dark, responsive portfolio built with React, TypeScript, Tailwind CSS, and Vite. Navigation is Home, Projects, Experience, and About. Capstone and Argus lead both Home and Projects in an In progress section. Home then features the knee exoskeleton and electric trike; Projects includes all six previous projects, with self-balancing ahead of search and rescue. Experience covers General Motors and CMU MetaMobility, with a link to the Knee Exoskeleton case study. Original robotics footage, hardware and PCB images, trike build media, and an interactive arm planner support the work.

## Run locally

Requires Node.js 24 and npm.

```sh
npm install
npm run dev
```

Vite prints the local preview address. Keep that command running while using the preview.

```sh
npm run check
npm run verify
npm run build
npm run preview
```

`verify` checks server-rendered routes, local assets, IK geometry, and two-, three-, and four-link obstacle detours without launching a browser. It independently samples swept links and checks blocked scenes, self-collision, thin obstacles, and joint wrapping. `build` type-checks and creates `dist/`, including the planner worker.

## Edit the content

- `src/content.ts`: contact links, project descriptions, experience, media framing, metrics, sources, and in-progress placeholders.
- `src/App.tsx`: page layouts, About copy, and the optional trike video player.
- `src/styles.css`: Tailwind theme and responsive component styles.
- `src/ArmDemo.tsx`, `src/kinematics.ts`, `src/planner.worker.ts`: arm controls, geometry/planning, and background search.
- `src/ProjectDemo.tsx`, `src/ProjectGallery.tsx`: native video players and selectable hardware views.
- `public/images/`: supplied portrait and stills extracted from original local build videos.
- `public/videos/`: silent, browser-compatible derivatives of the balancing and Pong recordings; Pong also retains its full-frame web recording.
- `public/resume.pdf`: the Robotics résumé, selected because the newer Internships copy has a clipped header.
- `CONTENT-CHECKLIST.md`: remaining user inputs and follow-up content.
- `SOURCES.md`: source evidence and asset provenance.

The diagrams illustrate the systems; they are not measured plots or original simulation recordings. The original arm project was a constructed, working two-link robot using A*. The website playground explores that idea further in a separate web implementation, with two to four links and movable obstacles. It uses analytical two-link IK, numerical CCD for redundant arms, and bounded RRT-Connect search in joint space.

Clicking a target starts planning and then slow automatic motion along the checked joint path. A dashed tip path and solid trail show the route. Add block enables click-to-place, or arrow keys and Enter can place a block on the focused plot. Every block is a fixed 32 × 32 square. Drag blocks or use arrow keys to move them; Delete or the bin removes the selected block. Up to six blocks are supported. Invalid placements are rejected; changed targets/blocks cancel the previous worker and animation. Link-count changes find a valid pose while preserving blocks. Reduced-motion settings skip animation.

Collision checks use thick links, rectangular obstacles, nonadjacent-link self-collision, a ground restriction, and joint limits that prevent folding adjacent links back onto each other. Swept edges are certified with clearance bounds and adaptive subdivision. Shortcutting and playback preserve these validated edges. Search is bounded, so “No path found within the search limit” does not prove a route is impossible. It is a browser illustration, not a hardware motion controller.

## Publish on GitHub Pages later

The site is currently local. No GitHub repository has been created, and nothing has been pushed or published.

1. Create a GitHub repository. For a personal root site, name it `YOUR_USERNAME.github.io`. An ordinary repository name such as `portfolio` also works. GitHub Free requires a public repository for Pages.
2. Add it as the `origin` remote, commit the site source, and push `main`. `node_modules`, `dist`, and the original workspace résumé are ignored; the intended public copy is in `public/`.
3. In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
4. Run the **Deploy portfolio to GitHub Pages** workflow if the initial push happened before Pages was enabled. Future pushes to `main` deploy automatically.

The workflow obtains the deployment base path from GitHub Pages. Assets work at either an account root or a repository subpath, including a future custom domain. Hash routing (`/#/projects/...`) lets direct project links and refreshes work on GitHub Pages without server rewrites or a 404 redirect workaround.

To build for a subpath manually:

```sh
BASE_PATH=/portfolio/ npm run build
```

No backend, API keys, analytics service, or remote font requests are required. The YouTube iframe loads only after the visitor presses play.

Deployment references: [Vite](https://vite.dev/guide/static-deploy.html#github-pages), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
