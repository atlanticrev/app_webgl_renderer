// const renderTriangles = (count = 10) => {
//     for (let i = 0; i < count; ++i) {
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
//
// export default { renderTriangles };
