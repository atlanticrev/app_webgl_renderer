import Canvas from "./Canvas.js";
// @todo pass objects to draw through options
import ObjectToDraw from "./objects/ObjectToDraw";
export default class WebGLRenderer {
    constructor() {
        this._canvas = new Canvas();
        this._gl = this._canvas.getCtx('webgl');
        this._objectsToDraw = [new ObjectToDraw(this._gl)];
        this._animationFrame = -1;
        this._renderIteration = this._renderIteration.bind(this);
    }
    /**
     * @returns void
     * @private
     */
    _setViewport() {
        /**
         * Setting up viewport
         * (Canvas bounding box, canvas render area and gl.viewport must be in sync)
         * (Viewport clearing)
         */
        // Moved to constructor (temp)
        // this._resizeCanvas();
        // This tells WebGL the (-1 <-> +1) clip space maps to
        // (0 <-> gl.canvas.width) for x,
        // (gl.canvas.height <-> 0) for y.
        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        this._gl.clearColor(0, 0, 0, 0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
    }
    /**
     * @returns void
     * @public
     */
    startRenderLoop() {
        this.stopRenderLoop();
        this._animationFrame = requestAnimationFrame(this._renderIteration);
    }
    /**
     * @returns void
     * @public
     */
    stopRenderLoop() {
        cancelAnimationFrame(this._animationFrame);
    }
    /**
     * @returns void
     * @private
     */
    _renderIteration() {
        this._render();
        this._animationFrame = requestAnimationFrame(this._renderIteration);
    }
    /**
     * @returns void
     * @private
     */
    _render() {
        this._canvas.resize();
        this._setViewport();
        this._objectsToDraw.forEach(object => object.render());
    }
}
//# sourceMappingURL=WebGLRenderer.js.map