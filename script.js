import vertexShader from './shaders/test_vert.glsl';
import fragmentShader from './shaders/test_frag.glsl';

class WebGLRenderer {
    /**
     * @constructor
     */
    constructor () {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('webgl-canvas');
        this.gl = this.canvas.getContext('webgl');

        this._vertexShader = this._createShader(this.gl.VERTEX_SHADER, vertexShader);
        this._fragmentShader = this._createShader(this.gl.FRAGMENT_SHADER, fragmentShader);

        // Creates a GLSL program on the GPU
        this._shaderProgram = this._createProgram(this._vertexShader, this._fragmentShader);

        this.attributes = new Map();

        this.buffers = new Map();
    }

    /**
     * @param {GLenum} type
     * @param {string} source
     * @return {WebGLShader}
     * @private
     */
    _createShader (type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
    }

    /**
     * @param {WebGLShader} vertexShader
     * @param {WebGLShader} fragmentShader
     * @return {WebGLProgram}
     * @private
     */
    _createProgram (vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
            return program;
        }
        console.log(this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
    }

    _settingUpStateToSupplyData () {
        // Save attributes/uniforms locations
        this.attributes.set('a_position',this.gl.getAttribLocation(this._shaderProgram, 'a_position'));

        // Create GPU buffer
        this.buffers.set('position_buffer', this.gl.createBuffer());
        // Fix global reference to this buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.get('position_buffer'));
        const positions = new Float32Array([
            0, 0,
            0, 0.5,
            0.7, 0
        ]);
        // Populate GPU buffer
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
    }

    _runRenderingCode () {
        this._resizeCanvas();
        // This tells WebGL the (-1 <-> +1) clip space maps to
        // (0 <-> gl.canvas.width) for x,
        // (0 <-> gl.canvas.height) for y.
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this._shaderProgram);
        // Activate attribute
        this.gl.enableVertexAttribArray(this.attributes.get('a_position'));
        // Specify how to pull the data out
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.get('position_buffer'));
        const size = 2;             // 2 components per iteration
        const type = this.gl.FLOAT; // the data is 32bit floats
        const normalize = false;    // don't normalize the data
        const stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;           // start at the beginning of the buffer
        // It binds the current ARRAY_BUFFER to the attribute
        this.gl.vertexAttribPointer(this.attributes.get('a_position'), size, type, normalize, stride, offset);
    }

    _drawCall () {
        const primitiveType = this.gl.TRIANGLES;
        const offset = 0;
        const count = 3;
        this.gl.drawArrays(primitiveType, offset, count);
    }

    _resizeCanvas () {}
}
