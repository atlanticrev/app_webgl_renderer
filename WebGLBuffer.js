export class Buffer {
    constructor(gl, data) {
        this._gl = gl;
        this._length = data.length;
        this._gpuBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gpuBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, data, this._gl.STATIC_DRAW);
    }
    bindWithAttribute(attribute, description) {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gpuBuffer);
        this._gl.vertexAttribPointer(attribute, description.size, description.type, description.normalized, description.stride, description.offset);
        this._gl.enableVertexAttribArray(attribute);
    }
    getLength() {
        return this._length;
    }
}
//# sourceMappingURL=WebGLBuffer.js.map