import vertexShader from './shaders/test_vert.glsl.js';
import fragmentShader from './shaders/test_frag.glsl.js';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

class WebGLRenderer {
    /**
     * @constructor
     */
    constructor () {
        // Canvas
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('webgl-canvas');
        document.body.appendChild(this.canvas);

        this.gl = this.canvas.getContext('webgl');

        this._vertexShader = this._createShader(this.gl.VERTEX_SHADER, vertexShader);
        this._fragmentShader = this._createShader(this.gl.FRAGMENT_SHADER, fragmentShader);
        // Creates a GLSL program on the GPU
        this._shaderProgram = this._createProgram(this._vertexShader, this._fragmentShader);

        // GPU data
        this.attributes = new Map();
        this.buffers = new Map();
        this.uniforms = new Map();

        this._resizeCanvas();
        this._render();
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

    _runInitStage () {
        /**
         * Getting indexes of uniforms and attributes
         */
        // @todo changing block start
        // Find uniforms/attributes locations in shader program on GPU
        this.attributes.set('a_position', this.gl.getAttribLocation(this._shaderProgram, 'a_position'));
        this.uniforms.set('u_resolution', this.gl.getUniformLocation(this._shaderProgram, 'u_resolution'));
        this.uniforms.set('u_color', this.gl.getUniformLocation(this._shaderProgram, 'u_color'));
        // @todo changing block end

        /**
         * GPU buffer creation
         */
        this.buffers.set('position_buffer', this.gl.createBuffer());

        /**
         * GPU buffer population
         */
        // Save reference to this buffer in global bind point ARRAY_BUFFER
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.get('position_buffer'));
        // Form buffer data
        // @todo changing block start
        const positions = new Float32Array([
            0, 0,
            0, 100,
            100, 0,
            100, 0,
            0, 100,
            100, 100
        ]);
        // @todo changing block end
        // Populate GPU buffer of "positions" data (sending data to GPU)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
    }

    _runRenderStage () {
        this._setUpViewport();

        this.gl.useProgram(this._shaderProgram);

        /**
         * Specify how to pull the data from buffer to attribute
         * and binds together buffer with attribute
         */
        // Activate attribute (?)
        this.gl.enableVertexAttribArray(this.attributes.get('a_position'));
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.get('position_buffer'));
        // a_position (vec4) attribute will get its first 2 values (x and y) from our buffer.
        // The z, and w will be the default 0 and 1 respectively.
        const size = 2;             // 2 components per iteration
        const type = this.gl.FLOAT; // the data is 32bit floats
        const normalize = false;    // don't normalize the data
        const stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;           // start at the beginning of the buffer
        // Bind the current ARRAY_BUFFER to the attribute
        this.gl.vertexAttribPointer(this.attributes.get('a_position'), size, type, normalize, stride, offset);

        /**
         * Setting uniforms
         */
        // @todo changing block start
        // Set uniforms
        this.gl.uniform2f(this.uniforms.get('u_resolution'), this.gl.canvas.width, this.gl.canvas.height);
        this.gl.uniform4f(this.uniforms.get('u_color'), 0.25, 0.45, 0.9, 1);
        // @todo changing block end

        /**
         * Draw call
         */
        // @todo changing block start
        const count = 6;
        // @todo changing block end
        this.gl.drawArrays(this.gl.TRIANGLES, 0, count);
    }

    _setUpViewport () {
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
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    _resizeCanvas () {
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.canvas.style.setProperty('--width', `${CANVAS_WIDTH}px`);
        this.canvas.style.setProperty('--height', `${CANVAS_HEIGHT}px`);
    }

    _render () {
        this._runInitStage();
        this._runRenderStage();
    }
}

// const renderTriangles = (count) => {
//     for (let i = 0; i < 2000; ++i) {
//         const positions = new Float32Array([
//             Math.random() * this.gl.canvas.width, Math.random() * this.gl.canvas.height,
//             Math.random() * this.gl.canvas.width, Math.random() * this.gl.canvas.height,
//             Math.random() * this.gl.canvas.width, Math.random() * this.gl.canvas.height,
//         ]);
//         // Populate GPU buffer of "positions" data (sending data to GPU)
//         this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
//
//         this.gl.uniform4f(this.uniforms.get('u_color'), Math.random(), Math.random(), Math.random(), 1);
//
//         this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
//     }
// };

window.renderer = new WebGLRenderer();
