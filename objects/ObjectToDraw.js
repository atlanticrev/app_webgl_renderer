import Utils from "../Utils.js";

import vertexShader from "../shaders/object_to_draw_vert.glsl.js";
import fragmentShader from "../shaders/object_to_draw_frag.glsl.js";

class ObjectToDraw {
    /**
     * @constructor
     */
    constructor (gl) {
        this.gl = /** @type {WebGLRenderingContext} */gl;
        this.shaderProgram = Utils.createProgramFromShaders(this.gl, vertexShader, fragmentShader);

        this.properties = {
            width: 300,
            color: [0.25, 0.45, 0.9, 1],
            scale: [1.2, 1.2],
            rotation: 0,
            translation: [400, 400]
        };

        this.buffers = new Map();
        this.attributes = new Map();
        this.uniforms = new Map();

        this.init();
    }

    /**
     * @abstract
     */
    init () {
        // Attributes/uniforms
        this.attributes.set('a_position', this.gl.getAttribLocation(this.shaderProgram, 'a_position'));

        this.uniforms.set('u_resolution', this.gl.getUniformLocation(this.shaderProgram, 'u_resolution'));
        this.uniforms.set('u_color', this.gl.getUniformLocation(this.shaderProgram, 'u_color'));
        this.uniforms.set('u_scale', this.gl.getUniformLocation(this.shaderProgram, 'u_scale'));
        this.uniforms.set('u_rotation', this.gl.getUniformLocation(this.shaderProgram, 'u_rotation'));
        this.uniforms.set('u_translation', this.gl.getUniformLocation(this.shaderProgram, 'u_translation'));

        // Buffers
        this.buffers.set('position_buffer', this.gl.createBuffer());
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.get('position_buffer'));
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            0, this.properties.width,
            this.properties.width, 0,
            this.properties.width, 0,
            0, this.properties.width,
            this.properties.width, this.properties.width
        ]), this.gl.STATIC_DRAW);
    }

    /**
     * @abstract
     */
    render () {
        this.gl.useProgram(this.shaderProgram);

        // for (let attribute of this.attributes.values()) {}
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.get('position_buffer'));
        this.gl.vertexAttribPointer(this.attributes.get('a_position'), 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.attributes.get('a_position'));

        // for (let uniform of this.uniforms.values()) {}
        this.gl.uniform2fv(this.uniforms.get('u_resolution'), [this.gl.canvas.width, this.gl.canvas.height]);
        this.gl.uniform4fv(this.uniforms.get('u_color'), this.properties.color);

        this.gl.uniform2fv(this.uniforms.get('u_scale'), this.properties.scale);
        // @todo Changing in animation
        this.properties.rotation += 1;
        this.gl.uniform2fv(this.uniforms.get('u_rotation'), this.getRotation(this.properties.rotation));
        this.gl.uniform2fv(this.uniforms.get('u_translation'), this.properties.translation);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

    getRotation (angleInDegrees) {
        const angleInRadians = angleInDegrees * Math.PI / 180;
        const sin = Math.sin(angleInRadians);
        const cos = Math.cos(angleInRadians);
        return [sin, cos];
    }
}

export default ObjectToDraw;
