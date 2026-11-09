export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  previewTags?: string[];
  visual:
    | "exo"
    | "usar"
    | "arm"
    | "ev"
    | "balance"
    | "pong"
    | "argus"
    | "capstone"
    | "armadillo";
  status?: "in-progress";
  context: string;
  overview: string;
  sections: { title: string; text: string }[];
  facts: { value: string; label: string }[];
  links?: { label: string; url: string }[];
  gallery?: {
    title: string;
    label: string;
    previewLabel: string;
    previewDetail: string;
  };
  photos?: {
    src: string;
    alt: string;
    title: string;
    caption: string;
    position: string;
    fit?: "contain" | "cover";
    previewFit?: "contain" | "cover";
    framing?: "capstone-sketch";
    source?: { label: string; url: string };
  }[];
  demo?: {
    title: string;
    badge?: string;
    video: string;
    fullVideo?: string;
    poster: string;
    cardPoster?: string;
    alt: string;
    caption: string;
    duration: string;
    aspectRatio: string;
    posterPosition?: string;
    observations: { title: string; text: string }[];
  };
};

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  email: "rayhan.sarabu@gmail.com",
  github: "https://github.com/Rsarabu28",
  linkedin: "https://www.linkedin.com/in/ray-sarabu-ab7ba2256",
};

export const experience = [
  {
    organization: "General Motors",
    shortName: "GM",
    role: "Advanced Systems Development Intern",
    dates: "May – Aug 2026",
    category: "Industry · ADAS",
    summary:
      "I worked on tools for checking and visualizing vehicle sensor systems.",
    highlight:
      "Built a 76-check ADAS checkout tool and LiDAR–camera visualization tools.",
    contributions: [
      {
        title: "Vehicle checkout",
        text: "I built an ADAS checkout tool with 35 workflow steps and 76 pass/fail checks. It covered 5 LiDARs, 8 radars, and 11 cameras.",
      },
      {
        title: "Sensor visualization",
        text: "I developed tools to visualize point clouds from raw 128-channel LiDAR UDP data and project LiDAR points onto camera images.",
      },
      {
        title: "Operations monitoring",
        text: "I built a React and Node.js dashboard that refreshed operations data every 30 seconds.",
      },
    ],
    tags: ["ADAS", "LiDAR", "Sensor integration", "React / Node.js"],
    project: null,
  },
  {
    organization: "CMU MetaMobility Lab",
    shortName: "MM",
    role: "Student Researcher",
    dates: "2025 – 2026",
    category: "Research · Wearable robotics",
    summary:
      "At MetaMobility, or MeMo, I worked on hardware and embedded control systems for the lab’s knee exoskeleton.",
    highlight:
      "Developed custom PCBs, embedded electronics, and controls for the lab’s knee exoskeleton.",
    contributions: [
      {
        title: "Prototype development",
        text: "I helped develop the mechanical hardware and embedded electronics as the team built four generations of the exoskeleton.",
      },
      {
        title: "Sensing and control",
        text: "My work included connecting IMU sensing and motor control on Teensy and ESP32 microcontrollers. We used impedance control and spline trajectories to guide assistance during walking.",
      },
      {
        title: "Testing and iteration",
        text: "I worked on wireless firmware updates so we could adjust the device during testing without taking it apart.",
      },
    ],
    tags: ["Embedded systems", "Teensy / ESP32", "Controls", "Hardware"],
    project: { slug: "knee-exoskeleton", label: "Knee exoskeleton project" },
  },
];

export const projects: Project[] = [
  {
    slug: "arm-adillo",
    name: "Arm-adillo Robotic Manipulator",
    category: "Locomotion + manipulation · Personal project",
    year: "2026",
    visual: "armadillo",
    status: "in-progress",
    summary:
      "A robot arm that curls into a wheel and rolls to get around, then unfolds to pick things up. I’m designing it in simulation before building it.",
    previewTags: ["MuJoCo", "Reinforcement learning", "Mechanism design"],
    tags: [
      "MuJoCo",
      "Reinforcement learning",
      "Mechanism design",
      "Feetech servos",
    ],
    demo: {
      title: "How can a robot arm move without a mobile base?",
      badge: "SIMULATION",
      video: "videos/armadillo-rl-roll.mp4",
      poster: "images/armadillo-rl-roll-poster.jpg",
      alt: "A simulated robot curled into a ring, tipping over itself to roll across a checkered floor",
      caption:
        "The robot rolling one turn after another. The camera follows it, so the floor is what moves. Screen recording from my MuJoCo simulation; the video is silent.",
      duration: "28 sec",
      aspectRatio: "4 / 3",
      observations: [
        {
          title: "The arm is the wheel",
          text: "The links are curved, so they fold into a ring with the flat base as the bottom. There are no drive wheels anywhere on the robot.",
        },
        {
          title: "Rolling by leaning",
          text: "To roll, it reshapes itself so its weight sits just past the point it is standing on, tips over that point, and catches itself on the way down.",
        },
        {
          title: "Where the motion comes from",
          text: "I wrote the rolling motion by hand first, then trained a policy that nudges it while it runs. The learned version keeps its momentum instead of stopping between rolls.",
        },
      ],
    },
    gallery: {
      title: "The shape it settles into",
      label: "SIMULATION RENDERS",
      previewLabel: "ROLLING MANIPULATOR",
      previewDetail: "Design views ↗",
    },
    photos: [
      {
        src: "images/armadillo-curled-side.jpg",
        alt: "Side view of the robot curled into a ring, sitting on its flat base with the gripper folded inside",
        title: "Curled up",
        caption:
          "Curled into its rolling shape, seen from the side. The flat base is the bottom of the ring, so the robot sits still until it decides to tip over the curve. The gripper folds into the middle, out of the way of the floor.",
        position: "50% 50%",
      },
      {
        src: "images/armadillo-curled-back.jpg",
        alt: "Three-quarter view from behind the robot showing the raised shoulder post and the tapered base",
        title: "From behind",
        caption:
          "The same shape from behind. The shoulder sits on a short post above the base so the arm can swing while the robot is curled, and the base tapers toward the back to stay inside the rolling circle.",
        position: "50% 50%",
      },
      {
        src: "images/armadillo-reach.jpg",
        alt: "The robot unfolded flat on the floor with its arm stretched out to a small cube at the edge of its reach",
        title: "Unfolded",
        caption:
          "Unfolded and reaching. Nothing bolts this robot down, so how far it can reach is set by when it tips, not by its joints. Reaching out, resting a hand on the floor, and sliding an object closer before lifting gets it to an object 53 cm away.",
        position: "50% 50%",
      },
    ],
    context: "Personal project · Simulation, heading to hardware",
    overview:
      "Almost every robot arm is either bolted to a bench or carried around on a mobile base that weighs more than the arm itself, and I have found very little work on arms that have neither. Arm-adillo is my attempt at one. The links of the arm are curved, so the same joints that reach out and grasp can also close the robot into a wheel and roll it across the floor.\n\nIt also has to survive doing that. A robot that travels by tipping over itself lands hard, so the shape, the motors, and the motion all have to be chosen together: light enough to throw itself over, strong enough to lift something once it gets there, and soft enough on landing not to strip a gearbox. Working that out is most of what the project has been so far.",
    sections: [
      {
        title: "What it has to do",
        text: "Curled up, the robot is a ring with one flat side. It sits still on the flat part, and to move it leans past the edge and tips over the curve, one roll at a time. It can also turn roughly in place.\n\nUnfolded, it is an arm again. It can pick an object up off the floor, fold it into the middle of the ring, and carry it there while it rolls, so the object never touches the ground. In simulation it has carried objects up to 300 g this way.",
      },
      {
        title: "Working it out in simulation",
        text: "I built the model in MuJoCo in stages, each one small enough to watch: a single hinge, a two-link arm, a chain that touches the ground, the curl into a ring, the first roll, then 3D, turning, and grasping. Each stage answered one question before the next one started.\n\nRather than hand-pick the proportions, I wrote a score for what I cared about and let a search try 150 variations of the geometry. Rolling and reaching want opposite things, so the point was to find one shape that is good enough at both.\n\nThe motions are written by hand and then improved with reinforcement learning. Every training run uses a slightly different robot, with the friction, masses, and motor strength shuffled, so the result doesn’t depend on one perfect machine. That matters because the real one won’t match the model exactly.",
      },
      {
        title: "Turning it into hardware",
        text: "The simulation is built around parts I can actually buy. Every mass in it comes from a list of real components, and the robot is driven by Feetech bus servos, the same ones the SO-101 arm uses, so the commands in the simulation are the commands the real servos take.\n\nThat is what I’m working on now: turning the locked-in dimensions into CAD, printing the shells and brackets, and then measuring the real hardware to correct the places where my model is still a guess.",
      },
    ],
    facts: [
      { value: "6 servos", label: "The whole robot: arm, wheel, and gripper" },
      { value: "≈0.9 kg", label: "Mass budget from the parts list" },
      { value: "53 cm", label: "Farthest pickup in simulation" },
    ],
    links: [
      {
        label: "Devlog: Arm-adillo week 1",
        url: "https://www.youtube.com/watch?v=OCEDUJ_FHkE",
      },
      {
        label: "SO-101 arm (LeRobot)",
        url: "https://github.com/huggingface/lerobot",
      },
      {
        label: "MuJoCo Menagerie",
        url: "https://github.com/google-deepmind/mujoco_menagerie",
      },
    ],
  },
  {
    slug: "argus-3",
    name: "Argus 3 Nanosatellite",
    category: "Space systems · CMU 18-873",
    year: "2026",
    visual: "argus",
    status: "in-progress",
    summary:
      "A CMU CubeSat that works out its own orbit from photographs of Earth, with no GPS. I work on the flight computer side and on the simulator we test it in.",
    previewTags: ["Computer vision", "Jetson Orin", "Simulation"],
    tags: [
      "Computer vision",
      "Jetson Orin",
      "ONNX / TensorRT",
      "NASA SPICE",
      "Simulation",
      "GNC",
    ],
    gallery: {
      title: "Earth as a reference",
      label: "PROJECT SAMPLE IMAGERY",
      previewLabel: "VISION-BASED NAVIGATION",
      previewDetail: "Earth imagery ↗",
    },
    photos: [
      {
        src: "images/argus-earth-10t.jpg",
        alt: "Earth-image mosaic of Washington and Oregon with coastline, mountain ranges, clouds, and agricultural land",
        title: "Washington & Oregon",
        caption: "Region 10T from the Argus sample image set. Geotagged imagery like this is what a camera frame gets matched against to produce a position. This is a project input image, not a photo taken by Argus in orbit.",
        position: "50% 50%",
        fit: "contain",
        source: { label: "Source: Argus model repository", url: "https://github.com/cmu-argus-2/NN-models/blob/b79f54a3840afd5e34f4a9c1c0e6ebd8a8971d6c/rc/sample_images/l9_10T_00001.png" },
      },
      {
        src: "images/argus-earth-17r.jpg",
        alt: "Earth-image mosaic of Florida showing the peninsula, surrounding water, and cloud cover",
        title: "Florida",
        caption: "Region 17R from the same set. A coastline gives the match something distinctive to work with; black areas contain no image data. Sample imagery used by the project, not a localization result.",
        position: "65% 50%",
        fit: "contain",
        source: { label: "Source: Argus model repository", url: "https://github.com/cmu-argus-2/NN-models/blob/b79f54a3840afd5e34f4a9c1c0e6ebd8a8971d6c/rc/sample_images/l9_17R_00000.png" },
      },
    ],
    context: "CMU 18-873 · Visual & agentic GNC team",
    overview:
      "Argus is a CubeSat built to work out where it is from pictures of Earth. Instead of a GPS receiver, it carries a camera and a localization model: each photo is matched against a database of known Earth imagery, and the position that comes out of the match is what navigation runs on.\n\nI’m on the visual and agentic GNC team. One half of it works on the localization model and getting it to run on the spacecraft’s computer; the other builds the simulator everything is tested in, and the agent that will decide when the satellite takes its next picture. I work across both halves: getting the model onto the flight computer, and building out the simulator, in particular the layer that knows where the Sun and the Earth are.",
    sections: [
      {
        title: "Finding yourself from one photo",
        text: "The model turns a camera frame into a vector and searches a database of geotagged Earth tiles for the closest match. That gives a rough location. A second stage matches features between the photo and the retrieved tile to produce precise ground points, which is what orbit determination actually needs.\n\nOn real photographs the full-size model retrieves the correct tile first about 68% of the time and almost always within its top hundred, for a median error around 79 km. Adding the feature matcher brings that down to roughly 16 km, on about half the photos. That is still a long way from where it needs to be, and closing that gap is where most of our effort is going.",
      },
      {
        title: "Getting the model onto the flight computer",
        text: "The satellite carries a Jetson Orin Nano, and the camera and computer are only powered for about ten minutes per cycle, so speed and memory matter as much as accuracy. We converted both sizes of the model, 27M and 105M parameters, from PyTorch through ONNX to TensorRT on the device, and checked the converted outputs against the originals on real photographs taken from the ISS.\n\nThey run at 15 and 44 milliseconds per image. We tried half precision, which was about twice as fast, but the outputs drifted far enough to risk retrieving the wrong place, so we stayed at full precision. The reference database is around 300 GB and cannot live on the satellite, which is the other half of the small-versus-large model decision.",
      },
      {
        title: "The simulator it gets tested in",
        text: "None of this can be checked against the real thing, so we are building a simulator where the right answer is known: Basilisk for the orbital physics, and Unity with NASA imagery for what the camera would see. The physics runs as its own headless service and owns the clock, so the rendering just follows along.\n\nMy part is the layer that knows where things are and when. It uses NASA’s SPICE toolkit to supply Sun and Earth positions and eclipse times, and includes a tool that fetches the planetary data files and checks each one against an approved fingerprint before a run, so a missing or altered file is caught up front instead of quietly producing wrong results. Alongside that I work through issues on the simulation repo with the rest of the team as the codebase gets restructured.",
      },
      {
        title: "Letting an agent decide when to look",
        text: "The other side of the project is an agent that recommends when the spacecraft should take its next picture, from its predicted ground track, the sun angle, whether it is in eclipse, and how useful the resulting image is likely to be.\n\nThe plan is to prove that on the ground first, where there is compute, full logging, and a human approval step, and only then look at which time-critical pieces could move onto the satellite.",
      },
    ],
    facts: [
      { value: "44 ms", label: "Full model per image on the Jetson" },
      { value: "16 km", label: "Median error, photo to position" },
      { value: "10 min", label: "Camera and compute per cycle" },
    ],
    links: [
      { label: "18-873 course page", url: "https://courses.ece.cmu.edu/18873" },
      { label: "Argus on GitHub", url: "https://github.com/cmu-argus-2" },
    ],
  },
  {
    slug: "robotics-capstone",
    name: "Attire Sorting Robot",
    category: "Manipulation · Capstone",
    year: "2026–27",
    visual: "capstone",
    status: "in-progress",
    summary:
      "A robot that takes a pile of donated clothing and turns it into garments that have each been pulled out, identified, inspected, and sorted. A year-long team capstone, still early.",
    previewTags: ["Deformable objects", "Perception-driven manipulation", "Task planning"],
    gallery: {
      title: "The concept",
      label: "CONCEPT SKETCH",
      previewLabel: "SORTING DONATED CLOTHING",
      previewDetail: "Robot concept ↗",
    },
    photos: [{
      src: "images/capstone-concept.png",
      alt: "Front and side concept sketches of a mobile robot with two articulated arms and grippers on a vertical column",
      title: "An early concept",
      caption: "An early concept sketch from the project brief, credited to Mohammed Rajkotwala. The hardware is not chosen yet, so this shows the idea rather than the machine we will build.",
      position: "50% 50%",
      framing: "capstone-sketch",
    }],
    tags: [
      "Deformable objects",
      "Singulation from clutter",
      "Garment classification",
      "Defect inspection",
      "Task planning",
    ],
    context: "CMU 16-450 · Team of four (Legen-droids)",
    overview:
      "Donation centers receive clothing in unsorted piles, and separating, checking, and preparing each item is done almost entirely by hand. Our capstone asks whether a robot can do the middle of that job: start from a pile of donated clothing and end with garments that have each been pulled out on their own, identified, inspected for damage, folded or hung, and placed where they belong.\n\nWe have written the requirements and defined the pipeline. The hardware, the grippers, the sensing, and the software architecture are all still open, and the project runs through the year.",
    sections: [
      {
        title: "Why clothing is hard",
        text: "Clothes have no fixed shape. Pulled off a pile, the same shirt can look completely different from one grasp to the next, and the things you need to see in order to identify or inspect it, a waistband, a sleeve, a tag, a stain or a hole, are usually the things that end up hidden. The robot cannot classify a garment until it has first manipulated it into a position where those features are visible.\n\nMost of the prior work we found demonstrates one skill at a time: grasping and spreading a single item, or folding one that has already been laid out flat. What makes this project harder is the chain, where every step depends on what the step before it saw.",
      },
      {
        title: "The pipeline",
        text: "We defined the robot’s job as a sequence: take a garment from the pile, check that it only picked up one, arrange it so it can be seen properly, identify it, inspect it for defects, and then decide what happens to it. Small items like socks get folded, large ones like shirts get hung, and both get sorted. Anything with a defect goes to a rejection pile.\n\nThe branch we care most about is the one where the robot is unsure. Anything it cannot identify or inspect confidently, and anything it fails to handle after a set number of retries, goes to a manual-review bin instead of being guessed at. For this application a system that knows what it cannot do is worth more than one that is confidently wrong.",
      },
      {
        title: "What we are aiming at",
        text: "The requirements set the targets we will be measured against. The headline ones are to run the full pipeline on at least 70% of garments with no human intervention, and to reach the correct final outcome, sorted, rejected, or manual review, for 90% of them. The acceptance test is a pile of at least ten garments across four categories, placed in configurations we have not practiced on, with at least one defective item in it.\n\nWe have agreed to prioritize a complete path through the pipeline on a small set of garments over doing any single step well. Choosing the hardware and getting that first end-to-end slice working is what comes next.",
      },
    ],
    facts: [
      { value: "5 categories", label: "Shirts, pants, shorts, socks, underwear" },
      { value: "70%", label: "Target: full pipeline, no human help" },
      { value: "Manual review", label: "Where anything uncertain goes" },
    ],
  },
  {
    slug: "knee-exoskeleton",
    name: "Knee Exoskeleton",
    category: "Wearable robotics · Research",
    year: "2025–26",
    visual: "exo",
    summary:
      "I designed custom PCBs and developed embedded control and mechanical hardware for a research knee exoskeleton at CMU.",
    tags: ["PCB design", "Embedded systems", "Controls"],
    photos: [
      {
        src: "images/knee-prototype-side.jpg",
        alt: "Side view of a worn knee exoskeleton prototype showing the knee actuator, thigh electronics, and shank sensor mount",
        title: "Wearable prototype",
        caption:
          "The side view shows how the actuator, thigh electronics, and shank sensor attach to the wearer. This prototype photo is from the 2025 project overview.",
        position: "50% 60%",
        fit: "contain",
      },
      {
        src: "images/knee-prototype-front.jpg",
        alt: "Front view of the knee exoskeleton prototype with thigh and shank cuffs",
        title: "Cuffs and mounting",
        caption:
          "A front view of the cuffs and mounting points, from the same prototype shown in the 2025 overview.",
        position: "50% 55%",
        fit: "contain",
      },
    ],
    context: "CMU MetaMobility Lab · Collaborative research",
    overview:
      "The knee exoskeleton is a wearable device developed at CMU’s MetaMobility Lab, also known as MeMo, to assist knee flexion and extension during walking. The system combines mechanical support, joint actuation, inertial sensing, and embedded control to guide assistance through a gait cycle.",
    sections: [
      {
        title: "My role",
        text: "I designed the custom thigh-controller and shank-sensor PCBs, integrated embedded sensing and motor control, and worked with the team on mechanical prototypes and gait control across four hardware generations.",
      },
      {
        title: "Hardware integration and iteration",
        text: "I designed and tested hardware across four prototype generations. We revised the frame, cuffs, anchoring, and electronics packaging to improve how the device transfers torque and fits on the wearer.",
      },
      {
        title: "Sensing and motor control",
        text: "I integrated a Teensy and ESP32 control stack with SPI, I²C, UART, and CAN communication. I also worked on impedance controllers and spline trajectories to shape assistance around a user’s gait. Wireless firmware updates let us change the control software during testing without taking the device apart.",
      },
      {
        title: "Custom control PCB",
        text: "The electronics work developed into a custom thigh control board that brings the power, sensors, and motor communication together. A later Fusion revision includes Teensy 4.1, separate motor and Jetson CAN interfaces, thigh and shank IMU connections, an LM2596 buck module, and connectors for battery power, motor power, and the E-stop. I continued revising the PCB after the original project overview.",
      },
      {
        title: "Shank sensor board",
        text: "I also designed a separate board around the ICM-20948 IMU. It includes a 1.8 V regulator and level shifting, with SPI signals carried through a CAT6 cable to the main controller. Keeping the sensor electronics on the shank lets the control system use measurements from both parts of the leg.",
      },
      {
        title: "Results and hardware revisions",
        text: "The team built four functional prototype generations. The gallery shows the wearable hardware from the 2025 project overview, and the PCB images below document later electronics design revisions. These revisions bring the controller, sensors, and power connections onto dedicated boards.",
      },
    ],
    facts: [
      { value: "4 generations", label: "Functional prototypes" },
      { value: "Thigh + shank PCBs", label: "Custom electronics" },
      { value: "Teensy + ESP32", label: "Embedded platforms" },
    ],
    links: [
      { label: "MetaMobility Lab", url: "https://metamobility.cmu.edu/" },
    ],
  },
  {
    slug: "self-balancing-robot",
    name: "Self-Balancing Robot",
    category: "Control systems · Coursework",
    year: "2026",
    visual: "balance",
    demo: {
      title: "Balancing on the bench",
      video: "videos/self-balancing-robot.mp4",
      poster: "images/self-balancing-poster.jpg",
      alt: "The two-wheeled balancing robot standing upright on a classroom table",
      caption:
        "Our balancing robot during a tabletop test. The video is silent.",
      duration: "13 sec",
      aspectRatio: "1 / 1",
      posterPosition: "50% 50%",
      observations: [
        {
          title: "Watch the wheels",
          text: "Small wheel movements correct the robot’s tilt as it stands on the table.",
        },
        {
          title: "Controlling the tilt",
          text: "Our software combines inertial measurements into a tilt estimate, then uses that estimate to command the motors.",
        },
      ],
    },
    summary:
      "A two-wheeled robot our team programmed to stay upright using IMU readings, a Kalman filter, and feedback control.",
    tags: ["Kalman filter", "PD / PID", "Sensor fusion"],
    context: "CMU 16-281 · Team of three",
    overview:
      "Our team built and tuned the estimation and control software for a two-wheeled robot. It combines accelerometer and gyroscope measurements to estimate tilt, then moves its wheels to stay upright.",
    sections: [
      {
        title: "Estimating tilt",
        text: "We calibrated the gyroscope bias and combined accelerometer and gyroscope readings in a two-state Kalman filter. The filter estimates both tilt and gyro bias to reduce drift in the signal used by the controller.",
      },
      {
        title: "Tuning the controller",
        text: "We tried PD/PID controller variants and adjusted the gains, dead zones, and correction strength near the balance point. One version targets a 100 Hz loop. The software stops the motors if the robot tilts too far from upright.",
      },
      {
        title: "Testing recovery",
        text: "We also worked on getting the robot to recover after a push. We adjusted the sensor filtering, controller timing, and motor response together while tuning the behavior on the hardware.",
      },
    ],
    facts: [
      { value: "2-state Kalman filter", label: "Tilt & gyro-bias estimation" },
      { value: "100 Hz target", label: "Control loop in code" },
      { value: "Team of 3", label: "Collaborative build" },
    ],
    links: [
      {
        label: "CMU balancing lab",
        url: "https://www.cs.cmu.edu/~16311/current/labs/lab04/index.html",
      },
    ],
  },
  {
    slug: "planar-arm",
    name: "2-DOF Robotic Arm",
    category: "Manipulation · Coursework",
    year: "2025",
    visual: "arm",
    summary:
      "A two-link robot our team built and ran on hardware, using inverse kinematics and A* planning to move around obstacles.",
    tags: ["Inverse kinematics", "A* planning", "Python"],
    context: "CMU 16-281 · Team of three",
    overview:
      "For the original class project, our team constructed a two-link planar robot and got it working on real hardware. We wrote the planning and control software, using inverse kinematics to find joint angles for a target and A* to plan a route around obstacles. We also built a simulator to test paths before running them on the physical arm.",
    sections: [
      {
        title: "Solving for joint angles",
        text: "We used analytical forward and inverse kinematics to convert between the arm’s joint angles and tip position. The solver checks elbow configurations, reach limits, and joint limits before passing a solution to the planner.",
      },
      {
        title: "Planning around obstacles",
        text: "The planner checks points along both links for collisions and uses A* to search a grid of joint angles in 5° increments. We added a cost for getting close to obstacles so the planner favors paths with more clearance. Matplotlib plots show the path in the robot’s workspace and in joint space.",
      },
      {
        title: "Moving the arm",
        text: "The hardware controller requests joint waypoints from the desktop planner over TCP. A PD position controller works with the motor velocity controllers to move the arm through those waypoints.",
      },
    ],
    facts: [
      { value: "2 DOF", label: "Planar mechanism" },
      { value: "A*", label: "Configuration-space search" },
      { value: "5° grid", label: "Planner discretization" },
    ],
    links: [
      {
        label: "CMU arm lab",
        url: "https://www.cs.cmu.edu/~16311/current/labs/lab09/index.html",
      },
    ],
  },
  {
    slug: "electric-vehicles",
    name: "Electric Vehicle Builds",
    category: "Personal builds · Ray’s Builds",
    year: "2023–24",
    visual: "ev",
    summary:
      "I designed and built an enclosed electric trike and drift cart, covering CAD, frame fabrication, drivetrains, and 48 V electronics.",
    tags: ["CAD", "Fabrication", "Electronics"],
    context: "Personal projects · Ray’s Builds",
    overview:
      "I built an enclosed recumbent trike and an electric drift cart as personal projects. The trike brought mechanical design, fabrication, drivetrain integration, and electrical systems together in one working vehicle. I documented the build on my YouTube channel, Ray’s Builds.",
    sections: [
      {
        title: "My role: design through assembly",
        text: "I took the trike from CAD and frame construction through electronics integration, assembly, and driving tests. Designing the enclosure and chassis together meant making the physical packaging, drivetrain, and driver controls work as one system.",
      },
      {
        title: "Frame and drivetrain",
        text: "I designed the custom frame and enclosure, fabricated and welded the frame, then integrated the drivetrain. The build footage below follows that progression from the CAD model to the welded chassis and drivetrain installation.",
      },
      {
        title: "48 V electrical system",
        text: "The builds use 48 V battery packs and motor controllers. I worked on the electrical integration and driver controls alongside the mechanical assembly, bringing the battery, controller, and motor into the completed vehicle.",
      },
      {
        title: "Driving the finished builds",
        text: "I built and drove both vehicles. The 61-second trike testing montage shows the completed prototype in motion; the accompanying build images document the earlier design and fabrication work.",
      },
    ],
    facts: [
      { value: "2 vehicles", label: "Personal builds" },
      { value: "48 V", label: "Battery packs" },
      { value: "CAD to driving tests", label: "End-to-end project scope" },
    ],
    links: [
      {
        label: "Watch the trike in motion",
        url: "https://www.youtube.com/watch?v=Dt7nSeGx84Q",
      },
      {
        label: "Ray’s Builds channel",
        url: "https://www.youtube.com/@raysbuilds",
      },
    ],
  },
  {
    slug: "search-and-rescue",
    name: "Search & Rescue Robot",
    category: "Mobile robotics · Coursework",
    year: "2026",
    visual: "usar",
    photos: [
      {
        src: "images/usar-three-quarter.jpeg",
        alt: "Side view of the LEGO rescue robot with wheels, camera, flashlight, and exposed electronics",
        title: "The assembled robot",
        caption:
          "Our robot on the lab bench, with its camera, flashlight, and electronics mounted on the LEGO frame.",
        position: "50% 30%",
      },
      {
        src: "images/usar-front.jpeg",
        alt: "Front view of the rescue robot showing its camera, flashlight, and front mechanism",
        title: "Camera and front mechanism",
        caption: "The camera mount, flashlight, and front mechanism.",
        position: "50% 60%",
      },
      {
        src: "images/usar-overhead.jpeg",
        alt: "Overhead view of the rescue robot showing wiring and the LEGO chassis layout",
        title: "Inside the frame",
        caption:
          "The wiring and component layout between the wheels, viewed from above.",
        position: "50% 50%",
        fit: "contain",
      },
    ],
    summary:
      "Our team’s robot for a mock rescue course, with remote driving, live video, and routines that use camera input to guide movement.",
    tags: ["Python", "OpenCV", "Teleoperation"],
    context: "CMU 16-281 · Team of three",
    overview:
      "For CMU’s urban search-and-rescue challenge, our team built a robot to navigate a mock disaster course with stairs, ramps, rubble, and tight spaces. We worked together on the physical build, electronics, and software. An operator could drive it remotely using a live camera feed, with assisted routines for some movements.",
    sections: [
      {
        title: "Remote driving",
        text: "Our laptop interface sends keyboard commands to a Raspberry Pi over UDP and displays live video from the robot. The robot software controls four drive channels, reads a time-of-flight distance sensor, and operates a stepper-driven mechanism.",
      },
      {
        title: "Recognizing arrows",
        text: "We used OpenCV to identify arrow directions using brightness thresholds, contours, and pixel counts on each side of the image. The software combines readings from several frames and retries with different thresholds when the result is uncertain.",
      },
      {
        title: "Driving through the course",
        text: "We used the IMU to control turns and hold a heading during sequences of driving, detecting an arrow, and turning. The robot climbed stairs and 45° inclines and survived 3 ft drops during the course project.",
      },
    ],
    facts: [
      { value: "Vision + teleoperation", label: "Control approach" },
      { value: "Raspberry Pi", label: "Robot platform" },
      { value: "Team of 3", label: "Collaborative build" },
    ],
    links: [
      {
        label: "CMU project brief",
        url: "https://www.cs.cmu.edu/~16311/current/labs/lab07/index.html",
      },
    ],
  },
  {
    slug: "fpga-pong",
    name: "FPGA Pong",
    category: "Digital design · Coursework",
    year: "",
    visual: "pong",
    demo: {
      title: "Playing Pong on the FPGA",
      video: "videos/fpga-pong-framed.mp4",
      fullVideo: "videos/fpga-pong.mp4",
      poster: "images/fpga-pong-framed-poster.jpg",
      cardPoster: "images/fpga-pong-card.jpg",
      alt: "Pong running on a lab monitor, with both paddles, the ball, and score visible",
      caption:
        "Our lab demo, cropped to show the game more clearly. The full recording includes the FPGA board. Both videos are silent.",
      duration: "35 sec",
      aspectRatio: "3 / 4",
      posterPosition: "50% 50%",
      observations: [
        {
          title: "Game output",
          text: "The SystemVerilog game logic controls the paddles, ball, and score shown on the monitor.",
        },
        {
          title: "Game logic",
          text: "Finite-state machines handle serving, direction, and collisions. The video modules use those states to draw the game.",
        },
      ],
    },
    summary:
      "A two-player Pong game we built in SystemVerilog and ran on an FPGA.",
    tags: ["SystemVerilog", "RTL", "FPGA"],
    context: "CMU 18-240 · Collaborative digital design coursework",
    overview:
      "We built a two-player Pong game in SystemVerilog. Separate modules handle the paddles, ball movement, serving, collisions, score, and screen effects.",
    sections: [
      {
        title: "Game state machines",
        text: "The ball state machine has states for initialization, serving, and movement in four directions. Keeping the paddle, ball, score, and color logic in separate modules let us work through each part of the game on its own.",
      },
      {
        title: "Display output",
        text: "We sent VGA timing and RGB output to the HDMI converter provided by the course. The design uses a 40 MHz pixel clock and a 200 MHz converter clock, and the board’s seven-segment displays show the score.",
      },
    ],
    facts: [
      { value: "SystemVerilog", label: "Hardware description" },
      { value: "40 MHz", label: "Configured pixel clock" },
      { value: "Two-player Pong", label: "Game" },
    ],
  },
];

export const inProgress = projects.filter(
  (project) => project.status === "in-progress",
);
export const pastProjects = projects.filter((project) => !project.status);
