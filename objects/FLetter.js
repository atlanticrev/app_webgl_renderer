import SceneObject from "./SceneObject.js";
import { Mat4 } from "../Math.js";
class FLetter extends SceneObject {
    constructor(gl, options) {
        super(gl, options);
    }
    // Every render
    calcSRTMatrix() {
        return Mat4.getIdentMat()
            .multiplyMatrix(Mat4.getTransMat(-50, -75, 0))
            .multiplyMatrix(Mat4.getScaleMat(this.properties.scale[0], this.properties.scale[1], this.properties.scale[2]))
            .multiplyMatrix(Mat4.getRotMatZ(this.properties.rotation))
            .multiplyMatrix(Mat4.getTransMat(this.properties.translation[0], this.properties.translation[1], this.properties.translation[2]))
            // Clipping
            .multiplyMatrix(new Mat4(2 / this._gl.canvas.width, 0, 0, 0, 0, -2 / this._gl.canvas.height, 0, 0, 0, 0, 1, 0, -1, 1, 0, 1))
            .toTypedArray();
    }
}
export default FLetter;
//# sourceMappingURL=FLetter.js.map