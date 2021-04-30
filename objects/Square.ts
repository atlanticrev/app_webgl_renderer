import SceneObject from "./SceneObject.js";
import { Mat4 } from "../Math.js";

class Square extends SceneObject {
    constructor(gl: WebGLRenderingContext, options: any) {
        super(gl, options);
    }

    // Every render
    setBuffers () {
        this._buffers['position_buffer'].location.bindWithAttribute(
            this._attributes['a_position'].location,
            {
                size: 3,
                type: this._gl.FLOAT,
                normalized: false,
                stride: 0,
                offset: 0
            }
        );
    }

    // Every render
    calcSRTMatrix () {
        return Mat4.getIdentMat()
            // Change transform origin
            .multiplyMatrix(
                Mat4.getTransMat(
                    -150,
                    -150,
                    0
                )
            )
            .multiplyMatrix(
                Mat4.getScaleMat(
                    this.properties.scale[0],
                    this.properties.scale[1],
                    this.properties.scale[2]
                )
            )
            .multiplyMatrix(
                Mat4.getRotMatX(this.properties.rotation[0])
            )
            .multiplyMatrix(
                Mat4.getRotMatY(this.properties.rotation[1])
            )
            .multiplyMatrix(
                Mat4.getRotMatZ(this.properties.rotation[2])
            )
            .multiplyMatrix(
                Mat4.getTransMat(
                    this.properties.translation[0],
                    this.properties.translation[1],
                    this.properties.translation[2]
                )
            )
            // Clipping
            .multiplyMatrix(
                Mat4.getOrthoMat(0, 0, this._gl.canvas.width, this._gl.canvas.height, 400, -400)
            )
            .toTypedArray();
    }
}

export default Square;
