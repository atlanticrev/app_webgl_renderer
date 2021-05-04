import SceneObject from "./SceneObject.js";
import { Mat4 } from "../Math.js";
class FLetter extends SceneObject {
    constructor(gl, options) {
        super(gl, options);
    }
    // Every render
    setBuffers() {
        this._buffers['position_buffer'].location.bindWithAttribute(this._attributes['a_position'].location, {
            size: 3,
            type: this._gl.FLOAT,
            normalized: false,
            stride: 0,
            offset: 0
        });
        this._buffers['color_buffer'].location.bindWithAttribute(this._attributes['a_color'].location, {
            size: 3,
            type: this._gl.UNSIGNED_BYTE,
            normalized: true,
            stride: 0,
            offset: 0
        });
    }
    // Every render
    calcSRTMatrix() {
        return Mat4.getIdentMat()
            // Change transform origin
            .multiplyMatrix(Mat4.getTransMat(-50, -75, -15))
            .multiplyMatrix(Mat4.getScaleMat(this.properties.scale[0], this.properties.scale[1], this.properties.scale[2]))
            .multiplyMatrix(Mat4.getRotMatZ(this.properties.rotation[2]))
            .multiplyMatrix(Mat4.getRotMatY(this.properties.rotation[1]))
            .multiplyMatrix(Mat4.getRotMatX(this.properties.rotation[0]))
            .multiplyMatrix(Mat4.getTransMat(this.properties.translation[0], this.properties.translation[1], this.properties.translation[2]))
            // Clipping
            // .multiplyMatrix(
            //     Mat4.getOrthoMat(0, 0, this._gl.canvas.width, this._gl.canvas.height, 400, -400)
            // )
            // .multiplyMatrix(
            //     Mat4.getWFactorMat(0.5)
            // )
            .multiplyMatrix(Mat4.getPerspMat(Math.PI / 4, this._gl.canvas.width / this._gl.canvas.height, 1, 2000))
            .toTypedArray();
    }
    calcAnimation() {
        const step = 0.5;
        this.properties.rotation[0] += step / 5;
        this.properties.rotation[1] += step;
        this.properties.rotation[2] += step / 5;
    }
}
export default FLetter;
//# sourceMappingURL=FLetter.js.map