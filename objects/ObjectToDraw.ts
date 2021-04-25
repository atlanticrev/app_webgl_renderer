import { createProgramFromShaders } from "../Utils";

type Properties = {
    width: number;
    color?: Array<number>;
    scale: Array<number>;
    rotation: number;
    translation: Array<number>;
}

import vertexShader from "../shaders/object_to_draw_vert.glsl.js";
import fragmentShader from "../shaders/object_to_draw_frag.glsl.js";

export default class ObjectToDraw {
    private readonly _gl: WebGLRenderingContext;
    private readonly _properties: Properties;
    private readonly _shaderProgram: WebGLProgram;
    private readonly _buffers: Map<string, any>;
    private readonly _attributes: Map<string, any>;
    private readonly _uniforms: Map<string, any>;

    constructor (gl: WebGLRenderingContext) {
        this._gl = gl;
        this._properties = {
            width: 300,
            // color: [0.25, 0.45, 0.9, 1],
            scale: [1, 1],
            rotation: 0,
            translation: [400, 400]
        };
        this._shaderProgram = createProgramFromShaders(this._gl, vertexShader, fragmentShader) as WebGLProgram;
        this._buffers = new Map();
        this._attributes = new Map();
        this._uniforms = new Map();
        this.init();
    }

    /**
     * @abstract
     */
    init () {
        // Getting attributes/uniforms locations in shader
        this._attributes.set('a_position', this._gl.getAttribLocation(this._shaderProgram, 'a_position'));
        this._uniforms.set('u_resolution', this._gl.getUniformLocation(this._shaderProgram, 'u_resolution'));
        // this._uniforms.set('u_color', this._gl.getUniformLocation(this._shaderProgram, 'u_color'));
        this._uniforms.set('u_scale', this._gl.getUniformLocation(this._shaderProgram, 'u_scale'));
        this._uniforms.set('u_rotation', this._gl.getUniformLocation(this._shaderProgram, 'u_rotation'));
        this._uniforms.set('u_translation', this._gl.getUniformLocation(this._shaderProgram, 'u_translation'));
        // Creating buffers
        this._buffers.set('position_buffer', this._gl.createBuffer());
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffers.get('position_buffer'));
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            0, this._properties.width,
            this._properties.width, 0,
            this._properties.width, 0,
            0, this._properties.width,
            this._properties.width, this._properties.width
        ]), this._gl.STATIC_DRAW);
    }

    /**
     * @abstract
     */
    render () {
        this.calcAnimation();

        this._gl.useProgram(this._shaderProgram);
        // for (let attribute of this._attributes.values()) {}
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffers.get('position_buffer'));
        this._gl.vertexAttribPointer(this._attributes.get('a_position'), 2, this._gl.FLOAT, false, 0, 0);
        this._gl.enableVertexAttribArray(this._attributes.get('a_position'));
        // for (let uniform of this._uniforms.values()) {}
        this._gl.uniform2fv(this._uniforms.get('u_resolution'), [this._gl.canvas.width, this._gl.canvas.height]);
        // this._gl.uniform4fv(this._uniforms.get('u_color'), this._properties.color);
        this._gl.uniform2fv(this._uniforms.get('u_scale'), this._properties.scale);
        this._gl.uniform2fv(this._uniforms.get('u_rotation'), this.getRotation(this._properties.rotation));
        this._gl.uniform2fv(this._uniforms.get('u_translation'), this._properties.translation);

        this._gl.drawArrays(this._gl.TRIANGLES, 0, 6);
    }

    calcAnimation () {
        this._properties.rotation += 0.05;
    }

    getRotation (angleInDegrees: number) {
        const angleInRadians = angleInDegrees * Math.PI / 180;
        const sin = Math.sin(angleInRadians);
        const cos = Math.cos(angleInRadians);
        return [sin, cos];
    }
}
