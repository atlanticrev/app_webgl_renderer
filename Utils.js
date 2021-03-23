const Utils = {
    /**
     * {WebGLRenderingContext} gl
     */
    _gl: null,

    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} vertexShaderSource
     * @param {string} fragmentShaderSource
     * @returns {WebGLProgram}
     */
    createProgramFromShaders: function (gl, vertexShaderSource, fragmentShaderSource) {
        this._gl = gl;
        return this.createProgram(
            this.createShader(this._gl.VERTEX_SHADER, vertexShaderSource),
            this.createShader(this._gl.FRAGMENT_SHADER, fragmentShaderSource)
        );
    },

    /**
     * @param {GLenum} type
     * @param {string} shaderSource
     * @return {WebGLShader}
     * @private
     */
    createShader: function (type, shaderSource) {
        const shader = this._gl.createShader(type);
        this._gl.shaderSource(shader, shaderSource);
        this._gl.compileShader(shader);
        const success = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS);
        if (success) return shader;
        console.log(this._gl.getShaderInfoLog(shader));
        this._gl.deleteShader(shader);
    },

    /**
     * @param {WebGLShader} vertexShader
     * @param {WebGLShader} fragmentShader
     * @return {WebGLProgram}
     * @private
     */
    createProgram: function (vertexShader, fragmentShader) {
        const program = this._gl.createProgram();
        this._gl.attachShader(program, vertexShader);
        this._gl.attachShader(program, fragmentShader);
        this._gl.linkProgram(program);
        const success = this._gl.getProgramParameter(program, this._gl.LINK_STATUS);
        if (success) return program;
        console.log(this._gl.getProgramInfoLog(program));
        this._gl.deleteProgram(program);
    }
};

export default Utils;
