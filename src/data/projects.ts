import booworks from "../assets/booworks.mp4";
import deciball from "../assets/deciball.mp4";
import draggableMasonry from "../assets/draggable-masonry.mp4";
import driftjs from "../assets/driftjs.mp4";
import pulsar from "../assets/pulsar.mp4";

type Project = {
  id: string;
  name: string;
  videoSrc: string;
  projectUrl?: string;
  gitHubUrl?: string;
  builtWith: string[];
  description: string[];
};

export const projects: Project[] = [
  {
    id: "booworks",
    name: "Booworks",
    videoSrc: booworks,
    gitHubUrl: "https://github.com/dalzein/booworks",
    builtWith: ["TypeScript", "React", "Vite", "Motion"],
    description: [
      "An experimental lab of satisfying, ghost-themed UI toys, fronted by a cute ghost that follows your cursor and reacts as you play.",
      "Each toy is a self-contained experiment in what modern CSS and `motion` can do. The physics run on imperative `requestAnimationFrame` loops so dragging never triggers React re-renders.",
    ],
  },
  {
    id: "driftjs",
    name: "Drift.js",
    videoSrc: driftjs,
    projectUrl: "https://driftjs.io",
    gitHubUrl: "https://github.com/dalzein/driftjs",
    builtWith: ["JavaScript"],
    description: [
      "A 2D drifting game built with native JavaScript, a bunch of math, `HTML <canvas>`, and the coolest `<div>` on the planet. `HTML <canvas>` was used purely for the tyre marks. Rendering is handled with `requestAnimationFrame()`. Supports mobile with touch controls.",
    ],
  },
  {
    id: "deciball",
    name: "Deciball",
    videoSrc: deciball,
    projectUrl: "https://deciball.io",
    gitHubUrl: "https://github.com/dalzein/deciball",
    builtWith: ["TypeScript", "React", "Vite"],
    description: [
      "A bass-focused audio visualiser in the style of Trap Nation.",
      "Frequency analysis, data cleansing, animation logic and particle effects are all completely custom and done using a bunch of math, the native `Web Audio API`, and native `HTML <canvas>`.",
    ],
  },
  {
    id: "draggable-masonry",
    name: "DraggableMasonry",
    videoSrc: draggableMasonry,
    gitHubUrl: "https://github.com/dalzein/draggable-masonry",
    builtWith: ["JavaScript"],
    description: [
      "A JavaScript library for creating reorderable masonry layouts, where elements are arranged in a grid but are not constrained to uniform row heights. Instead, items are placed in an optimal position based on available vertical space.",
    ],
  },
  {
    id: "pulsar",
    name: "Pulsar Mouse Configurator",
    videoSrc: pulsar,
    builtWith: ["TypeScript", "React.js"],
    description: [
      "A working browser-based mouse configurator prototype created for South Korean gaming peripherals company Pulsar Gaming Gears.",
      "Uses the native JavaScript `WebHID API` to communicate with the device and configure its settings.",
      "Source code and live demo cannot be shared publicly.",
    ],
  },
];
