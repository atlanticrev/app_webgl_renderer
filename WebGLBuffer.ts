export type BufferDescription = {
    size: number;
    type: number;
    normalized: boolean;
    stride: number;
    offset: number;
}

export class Buffer {
    private readonly _gl: WebGLRenderingContext;
    private readonly _length: number;
    private readonly _gpuBuffer: WebGLBuffer | null;

    constructor(gl: WebGLRenderingContext, data: Float32Array) {
        this._gl = gl;
        this._length = data.length;
        this._gpuBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gpuBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, data, this._gl.STATIC_DRAW);
    }

    bindWithAttribute (attribute: GLenum, description: BufferDescription) {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._gpuBuffer);
        this._gl.vertexAttribPointer(attribute,
            description.size,
            description.type,
            description.normalized,
            description.stride,
            description.offset
        );
        this._gl.enableVertexAttribArray(attribute);
    }

    getLength () {
        return this._length;
    }
}
