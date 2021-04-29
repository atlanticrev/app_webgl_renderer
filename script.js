import WebGLRenderer from "./WebGLRenderer.js";
import ControlPanel from "./ui/ControlPanel.js";

const renderer = window.renderer = new WebGLRenderer();
renderer.startRenderLoop();

const controlPanel = new ControlPanel(renderer);
controlPanel.addEventListener('EVENT_POSITION_CHANGE', renderer.onPositionChange);
controlPanel.addEventListener('EVENT_ROTATION_CHANGE', renderer.onRotationChange);
controlPanel.addEventListener('EVENT_SCALE_CHANGE', renderer.onScaleChange);
document.body.appendChild(controlPanel);
