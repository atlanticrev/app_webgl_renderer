import { createProgramFromShaders } from "../Utils.js";
import { Buffer } from "../WebGLBuffer.js";
import { Mat4 } from "../Math.js";

class SceneObject {
    properties: {[name: string]: any};
    protected readonly _gl: WebGLRenderingContext;
    protected readonly _shaderProgram: WebGLProgram;
    protected readonly _attributes: {[attribute: string]: any};
    protected readonly _uniforms: {[uniform: string]: any};
    protected readonly _buffers: {[buffer: string]: any};

    constructor (gl: WebGLRenderingContext, options: any) {
        this.properties = {
            scale: [
                options.properties.scale[0] || 1,
                options.properties.scale[1] || 1,
                options.properties.scale[2] || 1,
            ],
            rotation: [
                options.properties.rotation[0] || 0,
                options.properties.rotation[1] || 0,
                options.properties.rotation[2] || 0,
            ],
            translation: [
                options.properties.translation[0] || 0,
                options.properties.translation[1] || 0,
                options.properties.translation[2] || 0
            ]
        };
        this._gl = gl;
        this._shaderProgram = createProgramFromShaders(this._gl, options.shaders.vertexShader, options.shaders.fragmentShader) as WebGLProgram;
        this._attributes = options.attributes;
        this._uniforms = options.uniforms;
        this._buffers = options.buffers;
        this.init();
    }

    init () {
        // Attributes
        for (let attribute of Object.keys(this._attributes)) {
            this._attributes[attribute].location = this._gl.getAttribLocation(this._shaderProgram, attribute);
        }
        // Uniforms
        for (let uniform of Object.keys(this._uniforms)) {
            this._uniforms[uniform].location = this._gl.getUniformLocation(this._shaderProgram, uniform);
        }
        // Buffers
        for (let bufferName of Object.keys(this._buffers)) {
            this._buffers[bufferName].location = new Buffer(this._gl, this._buffers[bufferName].data);
        }
    }

    // Every render
    render () {
        this.calcAnimation();
        this._gl.useProgram(this._shaderProgram);
        this.setUniforms();
        this.setBuffers();
        this.drawCall();
    }

    // Every render
    setUniforms () {
        this._gl.uniformMatrix4fv(this._uniforms['u_position'].location, false, this.setSRTMatrix());
    }

    // Every render
    setBuffers () {}

    // Every render
    drawCall () {}

    calcAnimation () {}

    // Every render
    setSRTMatrix () {
        return Mat4.getIdentMat().toTypedArray();
    }

    // Every input change
    setPosition (x: string, y: string, z: string) {
        if (x) {
            this.properties.translation[0] = x;
        } else if (y) {
            this.properties.translation[1] = y;
        } else if (z) {
            this.properties.translation[2] = z;
        }
    }

    // Every input change
    setRotation (angleX: string, angleY: string, angleZ: string) {
        if (angleX) {
            this.properties.rotation[0] = angleX;
        } else if (angleY) {
            this.properties.rotation[1] = angleY;
        } else if (angleZ) {
            this.properties.rotation[2] = angleZ;
        }
    }

    // Every input change
    setScale (scalar: string) {
        this.properties.scale[0] = scalar;
        this.properties.scale[1] = scalar;
        this.properties.scale[2] = scalar;
    }
}

export default SceneObject;
