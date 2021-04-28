import { createProgramFromShaders } from "../Utils.js";
import { Buffer } from "../WebGLBuffer.js";
import { Mat4 } from "../Math.js";
class SceneObject {
    constructor(gl, options) {
        this._gl = gl;
        this._shaderProgram = createProgramFromShaders(this._gl, options.shaders.vertexShader, options.shaders.fragmentShader);
        this._attributes = options.attributes;
        this._globalUniforms = {
            u_resolution: {
                location: null
            }
        };
        this._uniforms = options.uniforms;
        this._buffers = options.buffers;
        this.properties = {
            scale: [
                options.properties.scale[0] || 1,
                options.properties.scale[1] || 1,
                options.properties.scale[2] || 1,
            ],
            rotation: options.properties.rotation || 0,
            translation: [
                options.properties.translation[0] || 0,
                options.properties.translation[1] || 0,
                options.properties.translation[2] || 0
            ]
        };
        this.init();
    }
    init() {
        // Attributes
        for (let attribute of Object.keys(this._attributes)) {
            this._attributes[attribute].location = this._gl.getAttribLocation(this._shaderProgram, attribute);
        }
        // Uniforms
        for (let uniform of Object.keys(this._globalUniforms)) {
            this._globalUniforms[uniform].location = this._gl.getUniformLocation(this._shaderProgram, uniform);
        }
        for (let uniform of Object.keys(this._uniforms)) {
            this._uniforms[uniform].location = this._gl.getUniformLocation(this._shaderProgram, uniform);
        }
        // Buffers
        for (let bufferName of Object.keys(this._buffers)) {
            this._buffers[bufferName].location = new Buffer(this._gl, this._buffers[bufferName].data);
        }
    }
    // Every render
    render() {
        this.calcAnimation();
        this._gl.useProgram(this._shaderProgram);
        this.setUniforms();
        this.setBuffers();
        this.drawCall();
    }
    // Every render
    setUniforms() {
        this._gl.uniform2fv(this._globalUniforms['u_resolution'].location, [this._gl.canvas.width, this._gl.canvas.height]);
        this._gl.uniformMatrix4fv(this._uniforms['u_position'].location, false, this.calcSRTMatrix());
    }
    // Every render
    setBuffers() {
        this._buffers['position_buffer'].location.bindWithAttribute(this._attributes['a_position'].location, {
            size: 2,
            type: this._gl.FLOAT,
            normalized: false,
            stride: 0,
            offset: 0
        });
    }
    // Every render
    drawCall() {
        this._gl.drawArrays(this._gl.TRIANGLES, 0, this._buffers['position_buffer'].location.getLength());
    }
    calcAnimation() { }
    // Every render
    calcSRTMatrix() {
        return Mat4.getIdentMat()
            .multiplyMatrix(Mat4.getScaleMat(this.properties.scale[0], this.properties.scale[1], this.properties.scale[2]))
            .multiplyMatrix(Mat4.getRotMatZ(this.properties.rotation))
            .multiplyMatrix(Mat4.getTransMat(this.properties.translation[0], this.properties.translation[1], this.properties.translation[2]))
            .toTypedArray();
    }
    // Every input change
    setPosition(x, y) {
        if (x) {
            this.properties.translation[0] = x;
        }
        else if (y) {
            this.properties.translation[1] = y;
        }
    }
    // Every input change
    setRotation(angle) {
        this.properties.rotation = angle;
    }
    // Every input change
    setScale(scalar) {
        this.properties.scale[0] = scalar;
        this.properties.scale[1] = scalar;
        this.properties.scale[2] = scalar;
    }
}
export default SceneObject;
//# sourceMappingURL=SceneObject.js.map