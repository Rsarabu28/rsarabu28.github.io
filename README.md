# Ray Sarabu's robotics portfolio

A responsive portfolio with a white and gray palette and self-hosted Inter Tight typography built with React, TypeScript, Tailwind CSS, and Vite. Navigation is Home, Projects, Experience, and About. Capstone and Argus lead both Home and Projects in an In progress section, using the same image-led project cards and case-study layout as previous work. Home then features the knee exoskeleton and electric trike; Projects includes all six previous projects, with self-balancing ahead of search and rescue. Experience covers General Motors and CMU MetaMobility, with a link to the Knee Exoskeleton case study. Original robotics footage, hardware and PCB images, trike build media, and an interactive arm planner support the work.

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

- `src/content.ts`: contact links, project descriptions, experience, media framing, metrics, sources, preview tags, and in-progress project details.
- `src/App.tsx`: page layouts, About copy, and the optional trike video player.
- `src/styles.css`: Tailwind theme and responsive component styles.
- `src/ArmDemo.tsx`, `src/kinematics.ts`, `src/planner.worker.ts`: arm controls, geometry/planning, and background search.
- `src/ProjectDemo.tsx`, `src/ProjectGallery.tsx`: native video players and selectable hardware views.
- `public/images/`: supplied portrait, project photography, build-video stills, capstone concept brief, and attributed Argus sample imagery.
- `public/videos/`: silent, browser-compatible derivatives of the balancing and Pong recordings; Pong also retains its full-frame web recording.
- `public/resume.pdf`: the Robotics résumé, selected because the newer Internships copy has a clipped header.
- `CONTENT-CHECKLIST.md`: remaining user inputs and follow-up content.
- `SOURCES.md`: source evidence and asset provenance.

Argus uses Earth imagery from the team’s MIT-licensed model repository, with source links and the license in `public/licenses/`. These are classifier input samples, not flight captures or localization results. The capstone preview frames the robot sketches in the supplied concept brief; **Full brief** opens the unchanged slide. In-progress detail pages distinguish current work from planned capabilities. Hover and keyboard focus share the same timing and directional arrows; reduced-motion settings suppress movement. The original card and case-study layouts are retained, with tighter mobile section spacing and brief technical accomplishments in the homepage experience rows.

The remaining diagrams illustrate the systems; they are not measured plots or original simulation recordings. The original arm project was a constructed, working two-link robot using A*. The website playground explores that idea further in a separate web implementation, with two to four links and movable obstacles. It uses analytical two-link IK, numerical CCD for redundant arms, and bounded RRT-Connect search in joint space.

Clicking a target starts planning and then slow automatic motion along the checked joint path. A dashed tip path and solid trail show the route. **Arm links** selects the number of links. **Add obstacle** enables click-to-place, or arrow keys and Enter can place an obstacle on the focused plot. Every obstacle is a fixed 32 × 32 square. Drag obstacles or use arrow keys to move them; Delete or the bin removes the selected obstacle. Up to six obstacles are supported. Invalid placements are rejected; changed targets/obstacles cancel the previous worker and animation. Link-count changes find a valid pose while preserving obstacles. The homepage demo is more compact on mobile; the project detail page retains the full-size demo. Reduced-motion settings skip animation.

Collision checks use thick links, rectangular obstacles, nonadjacent-link self-collision, a ground restriction, and joint limits that prevent folding adjacent links back onto each other. Swept edges are certified with clearance bounds and adaptive subdivision. Shortcutting and playback preserve these validated edges. Search is bounded, so “No path found within the search limit” does not prove a route is impossible. It is a browser illustration, not a hardware motion controller.

## Publishing and updates

The portfolio is live at [rsarabu28.github.io](https://rsarabu28.github.io/). Its public repository is [Rsarabu28/rsarabu28.github.io](https://github.com/Rsarabu28/rsarabu28.github.io).

1. Make changes in this folder and check them in the local preview with `npm run dev`.
2. In GitHub Desktop, review the changes, write a short summary, and choose **Commit to main**.
3. Choose **Push origin**. The **Deploy portfolio to GitHub Pages** workflow checks, builds, and publishes the updated site automatically.
4. Follow the latest run in the repository's **Actions** tab. Once it succeeds, the live site updates. A failed build does not replace the last successful deployment.

GitHub Pages is configured to use **GitHub Actions**. The `origin` remote already points to this repository. `node_modules`, `dist`, and the original workspace résumé are ignored; the intended public résumé is in `public/`.

The workflow obtains the deployment base path from GitHub Pages. Assets work at either an account root or a repository subpath, including a future custom domain. Hash routing (`/#/projects/...`) lets direct project links and refreshes work on GitHub Pages without server rewrites or a 404 redirect workaround.

To build for a subpath manually:

```sh
BASE_PATH=/portfolio/ npm run build
```

No backend, API keys, analytics service, or remote font requests are required. The YouTube iframe loads only after the visitor presses play.

Deployment references: [Vite](https://vite.dev/guide/static-deploy.html#github-pages), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
