export function createProgramFromShaders(gl, vertexShaderSource, fragmentShaderSource) {
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (vs && fs) {
        return createProgram(gl, vs, fs);
    }
    return null;
}
function createShader(gl, type, shaderSource) {
    const shader = gl.createShader(type);
    if (shader) {
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success)
            return shader;
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return null;
}
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    if (program) {
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success)
            return program;
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return null;
}
//# sourceMappingURL=Utils.js.map