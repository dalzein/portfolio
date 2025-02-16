import deciball from "../assets/deciball.mp4";
import draggableMasonry from "../assets/draggable-masonry.mp4";
import driftjs from "../assets/driftjs.mp4";
import propago from "../assets/propago.mp4";

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
    id: "driftjs",
    name: "Drift.js",
    videoSrc: driftjs,
    projectUrl: "https://driftjs.io",
    gitHubUrl: "https://github.com/dalzein/driftjs",
    builtWith: ["JavaScript"],
    description: [
      "A 2D drifting game written in native JavaScript using a bunch of math, `HTML <canvas>`, and the coolest `<div>` on the planet. `HTML <canvas>` was used purely for the tyre marks. Rendering is handled with `requestAnimationFrame()`. Supports mobile with touch controls.",
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
      "Frequency analysis and cleansing, animation logic, particle effects, etc are all completely custom and done using a bunch of math, the native `Web Audio API`, and native `HTML <canvas>`.",
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
    id: "propago",
    name: "Propago",
    videoSrc: propago,
    projectUrl: "https://propago.com.au",
    builtWith: ["TypeScript", "Next.js"],
    description: [
      "A web app for the consulting firm Propago, written in Next.js.",
    ],
  },
];
