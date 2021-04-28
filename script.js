import WebGLRenderer from "./WebGLRenderer.js";
import ControlPanel from "./ui/ControlPanel.js";

const renderer = window.renderer = new WebGLRenderer();
renderer.startRenderLoop();

const controlPanel = new ControlPanel(renderer);
controlPanel.addEventListener('EVENT_POSITION_CHANGE', renderer.onPositionChange);
controlPanel.addEventListener('EVENT_ROTATION_CHANGE', renderer.onRotationChange);
controlPanel.addEventListener('EVENT_SCALE_CHANGE', renderer.onScaleChange);
document.body.appendChild(controlPanel);

// Math tests
// import { Mat4 } from "./Math.js";
// const transMat = Mat4.getTransMat(100, 100 ,0);
// const rotMat = Mat4.getRotMatZ(45);
// const TRMat = transMat.multiplyMatrix(rotMat);
// const RTMat = rotMat.multiplyMatrix(transMat);
// console.warn(transMat, rotMat, TRMat, RTMat);
// console.warn(Mat4.getTransMat(300, 300, 0).toTypedArray());
