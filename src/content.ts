export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  visual: "exo" | "usar" | "arm" | "ev" | "balance" | "pong";
  context: string;
  overview: string;
  sections: { title: string; text: string }[];
  facts: { value: string; label: string }[];
  links?: { label: string; url: string }[];
  photos?: {
    src: string;
    alt: string;
    title: string;
    caption: string;
    position: string;
    fit?: "contain" | "cover";
  }[];
  demo?: {
    title: string;
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
    slug: "knee-exoskeleton",
    name: "Knee Exoskeleton",
    category: "Wearable robotics · Research",
    year: "2025–26",
    visual: "exo",
    summary:
      "A wearable knee-assistance device I helped develop, including its mechanical hardware, custom PCBs, and embedded control.",
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
      "The knee exoskeleton is a wearable device developed at CMU’s MetaMobility Lab, also known as MeMo, to assist knee flexion and extension during walking. I worked with the team on the mechanical prototypes, embedded electronics, and gait control, and designed custom PCBs for the thigh controller and shank sensor.",
    sections: [
      {
        title: "Hardware development",
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
      "An enclosed electric trike and a drift cart that I designed, built, and drove.",
    tags: ["CAD", "Fabrication", "Electronics"],
    context: "Personal projects · Ray’s Builds",
    overview:
      "I built an enclosed recumbent trike and an electric drift cart in my own time. I worked on the CAD, frame construction, electronics, and assembly, using 48 V battery packs and motor controllers. I documented the trike build on my YouTube channel, Ray’s Builds.",
    sections: [
      {
        title: "The recumbent trike",
        text: "The trike has a custom frame and enclosure, with a battery, motor controller, and driver controls. The videos cover the build from the frame design through testing the finished vehicle.",
      },
    ],
    facts: [
      { value: "2 vehicles", label: "Personal builds" },
      { value: "48 V", label: "Battery packs" },
      { value: "Design and assembly", label: "Project scope" },
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

export const currentProjects = [
  {
    number: "01",
    title: "Senior Capstone",
    category: "ECE + Robotics",
    description: "My senior capstone project. I’ll add the details soon.",
    icon: "capstone",
  },
  {
    number: "02",
    title: "Argus Nanosatellite",
    category: "Space systems",
    description:
      "I’m working with the Argus nanosatellite team. More details coming soon.",
    icon: "satellite",
  },
];
