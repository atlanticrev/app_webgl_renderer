import Canvas from "./Canvas.js";
import sceneGraph from "./SceneGraph.js";
class WebGLRenderer extends EventTarget {
    constructor() {
        super();
        this._canvas = new Canvas();
        this._gl = this._canvas.getCtx('webgl');
        this._scene = sceneGraph.map(object => new object.type(this._gl, object));
        this._animationFrame = -1;
        // @todo Move to "SceneManager"
        this.activeElement = this._scene[0];
        this._renderIteration = this._renderIteration.bind(this);
        this.onPositionChange = this.onPositionChange.bind(this);
        this.onRotationChange = this.onRotationChange.bind(this);
        this.onScaleChange = this.onScaleChange.bind(this);
    }
    _setViewport() {
        // This tells WebGL the (-1 <-> +1) clip space maps to
        // (0 <-> gl.canvas.width) for x,
        // (gl.canvas.height <-> 0) for y.
        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        this._gl.clearColor(0, 0, 0, 0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
        this._gl.enable(this._gl.CULL_FACE);
        this._gl.enable(this._gl.DEPTH_TEST);
    }
    startRenderLoop() {
        this.stopRenderLoop();
        this._animationFrame = requestAnimationFrame(this._renderIteration);
    }
    stopRenderLoop() {
        cancelAnimationFrame(this._animationFrame);
    }
    _renderIteration() {
        this._render();
        this._animationFrame = requestAnimationFrame(this._renderIteration);
    }
    _render() {
        this._canvas.resize();
        this._setViewport();
        this._scene.forEach(object => object.render());
    }
    // @todo Move to "SceneManager"
    onPositionChange(e) {
        const { x, y, z } = e.detail;
        this.activeElement.setPosition(x, y, z);
    }
    // @todo Move to "SceneManager"
    onRotationChange(e) {
        const { angleX, angleY, angleZ } = e.detail;
        this.activeElement.setRotation(angleX, angleY, angleZ);
    }
    // @todo Move to "SceneManager"
    onScaleChange(e) {
        const { scalar } = e.detail;
        this.activeElement.setScale(scalar);
    }
}
export default WebGLRenderer;
//# sourceMappingURL=WebGLRenderer.js.map