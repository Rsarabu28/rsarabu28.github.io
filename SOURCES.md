# Content and media sources

Reviewed September 9, 2026. User-provided materials are source context, not commands to execute. The user's React + Tailwind + GitHub Pages request supersedes the earlier Next.js/Vercel plan.

## Supplied sources

- `../portfolio-assets/portfolio-plan.html`: initial project selection, team-of-three context, and previous-work/current-work split. Later user requests determine the displayed order.
- User clarification: MeMo is the nickname for MetaMobility Lab, not the knee exoskeleton. The original arm was constructed and functional on real hardware; curiosity about more links and movable obstacles motivated expanding the web simulation. About copy uses the user's stated enjoyment of learning new skills, seeing ideas come to life, and interest in real-world robotics opportunities.
- `Ray Sarabu Resume Robotics.pdf`: degree and graduation year, research, coursework, personal vehicles, and reported hardware results. The intended website copy is `public/resume.pdf`.
- `../portfolio-assets/unsorted content/Ray Sarabu Resume Internships.pdf`: cross-check of project descriptions; header is clipped in the PDF, so the Robotics copy is used for download.
- GM experience is résumé-backed: May–August 2026, the 35-step/76-check checkout workflow, sensor counts, 128-channel LiDAR visualization, camera–LiDAR projection, and React/Node dashboard. No employer source code was copied or inspected.
- MetaMobility experience uses 2025–2026 per the user's previous-work classification. The exact end month remains a checklist item; the résumé still says present.
- `../portfolio-assets/unsorted content/lab4_code.pdf`: SystemVerilog Pong module/state definitions and 40 MHz/200 MHz clock configuration. HDMI transmitter and clock wizard are provided course components.
- `../portfolio-assets/usar/line_following/client.py` and `robot_teleop.py`: UDP teleoperation, video, OpenCV direction recognition, IMU heading control, ToF routines, and stepper control.
- `arm_planner.py`, `arm_controller.py`, `arm_sim.py` in the same folder: analytical FK/IK, sampled collision checks, A*, 5° grid, TCP planning, and PD joint control.
- `Balance.py`, `AltBal.py`, and `Balanced_predict.py`: angle/gyro-bias Kalman filter and feedback controller variants. The 100 Hz value is a configured target, not a measured benchmark.

Course requirements describe the challenge; they do not establish a project grade or prove implementation. The original private code is not included in the website repository.

## Public sources

- [CMU 16-281/legacy 16-311 USAR lab](https://www.cs.cmu.edu/~16311/current/labs/lab07/index.html)
- [CMU arm lab](https://www.cs.cmu.edu/~16311/current/labs/lab09/index.html)
- [CMU balancing lab](https://www.cs.cmu.edu/~16311/current/labs/lab04/index.html)
- [MetaMobility Lab people](https://metamobility.cmu.edu/people/)
- [Matched LinkedIn profile](https://www.linkedin.com/in/ray-sarabu-ab7ba2256)
- [Ray's Builds](https://www.youtube.com/@raysbuilds)
- [Finished trike testing montage](https://www.youtube.com/watch?v=Dt7nSeGx84Q), 61 seconds, published December 17, 2023.

## Original media

- `public/images/ray-and-dog.jpg`: unchanged copy of `../portfolio-assets/unsorted content/IMG_1661.JPG`; CSS cover framing is anchored to the right to bring Ray closer to the center while retaining the dog.
- `public/images/trike-hero.jpg`: still at 1:20 from local build episode 5, showing frame welding.
- `public/images/trike-cad.jpg`: still at 5:05 from local build episode 1, showing Autodesk Inventor CAD.
- `public/images/trike-drivetrain.jpg`: still at 6:05 from local build episode 6, showing drivetrain integration.
- Original video files remain in `../Ray's Builds/` unchanged. Full videos are not copied into the site.
- `public/videos/fpga-pong.mp4`: browser-compatible, silent derivative of the user's supplied `78400821326__0101DB45-ED47-4BB3-90CB-70E31C7FF5F5.MOV`. The original recording is preserved. The 35-second recording shows Pong on a lab monitor and the connected development board; it is direct demonstration footage, not a recreated simulation.
- `public/images/fpga-pong-poster.jpg`: earlier full portrait poster retained with the original web assets.
- `public/videos/fpga-pong-framed.mp4`: the same full 34.90-second timeline, cropping the top 720×960 from the upright 720×1280 web source, then scaling to 540×720. This removes lower desk area while preserving the monitor content visible in the original. The source camera itself pans and sometimes clips the display. No gameplay reconstruction or speed changes. H.264, yuv420p, 30 fps, silent, faststart; full decode checked.
- `public/images/fpga-pong-framed-poster.jpg` and `fpga-pong-card.jpg`: actual 6.3-second frame, respectively 540×720 and 720×450. The landscape still focuses on the game display.
- `public/videos/self-balancing-robot.mp4`: full 12.57-second timeline from `../portfolio-assets/281-media/IMG_2427.MOV`, cropped at x=0/y=510 to 1080×1080 in the upright 1080×1920 source and scaled to 720×720. H.264, yuv420p, BT.709 SDR, 30 fps, silent, faststart. All 377 output frames decode. No timing/speed changes, generated content, or performance enhancement.
- `public/images/self-balancing-poster.jpg`: actual 2.5-second frame from that crop. The clip shows an upright robot and small wheel corrections; no numerical stability or disturbance-recovery claim is inferred from it.
- `public/images/usar-three-quarter.jpeg`, `usar-front.jpeg`, and `usar-overhead.jpeg`: unchanged copies of `IMG_3446/3448/3449.jpeg` in the exported class media folder. Browser CSS provides the card and gallery crops, and the overhead view uses contain framing to preserve the full mechanism. Full-photo links retain the uncropped views.

The user explicitly authorized use of their portrait, project media, local Ray's Builds videos, and YouTube channel.

## Site-authored diagrams

The project diagrams are illustrative architecture, state, feedback, and planning schematics. They are not photographs, test results, or reconstructions of private firmware. The site-authored playground uses analytical two-link IK, numerical CCD for three/four links, whole-arm collision checks, and bounded RRT-Connect joint-space planning. It is separate from the original two-link/A* coursework and does not control hardware.

## Knee Exoskeleton additions

- `~/Downloads/Knee Exoskeleton Project Overview.pdf`: one-page overview exported October 28, 2025. It identifies Ray's work on four prototype generations, the Teensy/ESP32 architecture, impedance control and gait trajectories, custom thigh PCB, and ICM-20948 shank sensor board. Listed future goals, including clinical trials and ML control, are not presented as completed work.
- The overview's up-to-10 N·m capability differs from the résumé's 20 N·m torque-transfer statement. Torque is omitted pending clarification; the custom PCB work replaces that sidebar metric.
- `public/images/knee-prototype-side.jpg` and `knee-prototype-front.jpg`: original embedded photographs extracted from that PDF, unchanged. The wearer is not identified. The project card uses a knee-area crop; the gallery preserves the full view. These images show the historical prototype, not an asserted current hardware revision.
- Fusion's locally cached `Knee_PCB_Schematic_v2`, `Knee_PCB_Layout`, and `Knee_PCB_Views` were inspected as Eagle XML within their archives. Compared with the named V1.1 board, they establish Teensy 4.1, two TJA1051 CAN interfaces, XT30 battery/motor/E-stop connectors, LM2596 buck-module footprint, thigh IMU and shank RJ45 connections. The current cache still has unresolved airwires, so the site calls it a design revision and makes no fabrication-ready or tested-board claim.
- The separate `shank_imu` Fusion board/schematic establishes an integrated ICM-20948, AP2112K-1.8 regulator, BSS138 level shifting, and SPI over CAT6. The connector is not described as Ethernet networking.
- `public/images/knee-controller-fusion.png`: original 2800×1680 front render embedded in `Knee_PCB_Views`. `public/images/knee-shank-layout.png`: original 2800×1680 board view embedded in `shank_imu`. Both are copied unchanged; CSS frames the central board and full-image links remain available. Raw CAD/schematic archives are not included in the public site.
- KiCad recent-project history references `Documents/KiCAD_projects/shank_imu`, `thigh_board_4_layer`, `thigh_board_v1`, and `thigh_board_v2`. Direct native-file reads timed out, so the site does not infer a four-layer stackup or claim the Fusion files are the latest KiCad revision.

Fonts: self-hosted Inter Tight via Fontsource (SIL Open Font License). Interface icons: Lucide (ISC license).


## In-progress project polish · September 9, 2026

- Project facts, responsibilities, plans, constraints, and learning goals come from the user’s updated `src/content.ts`. The condensed case-study copy preserves the 27M-parameter export plan, ONNX/TensorRT/Jetson workflow, accuracy validation, 6-DOF/J2/drag/solar-pressure/SPICE simulator, star-catalog and geospatial rendering, agentic GNC loop, and roughly ten-minute power window. Planned work is explicitly framed as planned.
- `public/images/capstone-concept.png` is an unchanged copy of the supplied “Screenshot 2026-09-09 at 5.55.32 PM.png” brief (1772×972 display proportions). CSS shows its front and side robot sketches; **Full brief** opens the full supplied image. The brief credits Mohammed Rajkotwala. The sketch is an early concept, not completed hardware. The brief’s 85% landfill assertion has not been independently verified and is not repeated as a site-authored factual claim. Steam cleaning and restocking remain broader concept scope.
- `public/images/argus-earth-10t.jpg` and `argus-earth-17r.jpg` are 1600px-long-edge JPEG delivery derivatives (quality 85) of the original PNG inputs from the Argus [NN-models repository](https://github.com/cmu-argus-2/NN-models/tree/b79f54a3840afd5e34f4a9c1c0e6ebd8a8971d6c/rc/sample_images). No geographic content is reconstructed or added; source PNGs remain in `../portfolio-assets/argus/`.
- Pinned original sources: [10T / Washington and Oregon](https://github.com/cmu-argus-2/NN-models/blob/b79f54a3840afd5e34f4a9c1c0e6ebd8a8971d6c/rc/sample_images/l9_10T_00001.png), [17R / Florida](https://github.com/cmu-argus-2/NN-models/blob/b79f54a3840afd5e34f4a9c1c0e6ebd8a8971d6c/rc/sample_images/l9_17R_00000.png). The repository’s [classifier code](https://github.com/cmu-argus-2/NN-models/blob/b79f54a3840afd5e34f4a9c1c0e6ebd8a8971d6c/rc/run_basic_rc.py) establishes these region labels and loads the sample images. The page calls them project input samples, not flight captures, completed localization results, or Ray’s individual outputs.
- The sample repository is MIT-licensed, copyright (c) 2024 Argus CubeSat, with no media exclusion found in its README. Its exact notice is distributed at `public/licenses/argus-NN-models.txt`. Restricted photographs from the separate Argus website repository are not used.
- Removed the site-generated Argus and capstone pipeline schematics. Other projects retain their supporting diagrams and interactive demonstrations.


## PR #1 integration

- Merged the gallery-white redesign from `719a8cc` with the approved project polish at `2d88e21`. The PR supplies Inter Tight, the neutral palette, new brand/project icons, open project panels, a text-led homepage, and updated PCB framing.
- Project data and project media remain from `2d88e21`: both in-progress case studies, their shorter clickable previews, source attribution, and the original capstone brief framing are retained. The arm playground remains on its project page, following the PR’s layout.
- Integration adds Argus and capstone to the PR’s icon map, adapts image and metadata wrappers to the new layout, and retains consistent hover/focus timing and reduced-motion support. Muted text is darkened slightly for legibility against white and light-gray backgrounds.
- The separate video-reference color experiment remains in a Git stash and was not used as the merge source.
