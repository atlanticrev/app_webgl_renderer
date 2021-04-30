// import Square from "./objects/Square.js";
// import squareVertexShader from "./shaders/square_vert.glsl.js";
// import squareFragmentShader from "./shaders/square_frag.glsl.js";
import FLetter from "./objects/FLetter.js";
import fletterVertexShader from "./shaders/fletter_vert.glsl.js";
import fletterFragmentShader from "./shaders/fletter_frag.glsl.js";
const sceneGraph = [
    {
        type: FLetter,
        properties: {
            translation: [0, 0, -360],
            scale: [1.5, 1.5, 1],
            rotation: [180, 0, 0],
        },
        shaders: {
            vertexShader: fletterVertexShader,
            fragmentShader: fletterFragmentShader,
        },
        attributes: {
            a_position: {
                location: null,
            },
            a_color: {
                location: null,
            }
        },
        uniforms: {
            u_position: {
                location: null,
                type: 'uniformMatrix4fv',
                data: null
            }
        },
        buffers: {
            position_buffer: {
                location: null,
                data: new Float32Array([
                    // left column front
                    0, 0, 0,
                    0, 150, 0,
                    30, 0, 0,
                    0, 150, 0,
                    30, 150, 0,
                    30, 0, 0,
                    // top rung front
                    30, 0, 0,
                    30, 30, 0,
                    100, 0, 0,
                    30, 30, 0,
                    100, 30, 0,
                    100, 0, 0,
                    // middle rung front
                    30, 60, 0,
                    30, 90, 0,
                    67, 60, 0,
                    30, 90, 0,
                    67, 90, 0,
                    67, 60, 0,
                    // left column back
                    0, 0, 30,
                    30, 0, 30,
                    0, 150, 30,
                    0, 150, 30,
                    30, 0, 30,
                    30, 150, 30,
                    // top rung back
                    30, 0, 30,
                    100, 0, 30,
                    30, 30, 30,
                    30, 30, 30,
                    100, 0, 30,
                    100, 30, 30,
                    // middle rung back
                    30, 60, 30,
                    67, 60, 30,
                    30, 90, 30,
                    30, 90, 30,
                    67, 60, 30,
                    67, 90, 30,
                    // top
                    0, 0, 0,
                    100, 0, 0,
                    100, 0, 30,
                    0, 0, 0,
                    100, 0, 30,
                    0, 0, 30,
                    // top rung right
                    100, 0, 0,
                    100, 30, 0,
                    100, 30, 30,
                    100, 0, 0,
                    100, 30, 30,
                    100, 0, 30,
                    // under top rung
                    30, 30, 0,
                    30, 30, 30,
                    100, 30, 30,
                    30, 30, 0,
                    100, 30, 30,
                    100, 30, 0,
                    // between top rung and middle
                    30, 30, 0,
                    30, 60, 30,
                    30, 30, 30,
                    30, 30, 0,
                    30, 60, 0,
                    30, 60, 30,
                    // top of middle rung
                    30, 60, 0,
                    67, 60, 30,
                    30, 60, 30,
                    30, 60, 0,
                    67, 60, 0,
                    67, 60, 30,
                    // right of middle rung
                    67, 60, 0,
                    67, 90, 30,
                    67, 60, 30,
                    67, 60, 0,
                    67, 90, 0,
                    67, 90, 30,
                    // bottom of middle rung.
                    30, 90, 0,
                    30, 90, 30,
                    67, 90, 30,
                    30, 90, 0,
                    67, 90, 30,
                    67, 90, 0,
                    // right of bottom
                    30, 90, 0,
                    30, 150, 30,
                    30, 90, 30,
                    30, 90, 0,
                    30, 150, 0,
                    30, 150, 30,
                    // bottom
                    0, 150, 0,
                    0, 150, 30,
                    30, 150, 30,
                    0, 150, 0,
                    30, 150, 30,
                    30, 150, 0,
                    // left side
                    0, 0, 0,
                    0, 0, 30,
                    0, 150, 30,
                    0, 0, 0,
                    0, 150, 30,
                    0, 150, 0
                ])
            },
            color_buffer: {
                location: null,
                data: new Uint8Array([
                    // left column front
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    // top rung front
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    // middle rung front
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    200, 70, 120,
                    // left column back
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    // top rung back
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    // middle rung back
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    80, 70, 200,
                    // top
                    70, 200, 210,
                    70, 200, 210,
                    70, 200, 210,
                    70, 200, 210,
                    70, 200, 210,
                    70, 200, 210,
                    // top rung right
                    200, 200, 70,
                    200, 200, 70,
                    200, 200, 70,
                    200, 200, 70,
                    200, 200, 70,
                    200, 200, 70,
                    // under top rung
                    210, 100, 70,
                    210, 100, 70,
                    210, 100, 70,
                    210, 100, 70,
                    210, 100, 70,
                    210, 100, 70,
                    // between top rung and middle
                    210, 160, 70,
                    210, 160, 70,
                    210, 160, 70,
                    210, 160, 70,
                    210, 160, 70,
                    210, 160, 70,
                    // top of middle rung
                    70, 180, 210,
                    70, 180, 210,
                    70, 180, 210,
                    70, 180, 210,
                    70, 180, 210,
                    70, 180, 210,
                    // right of middle rung
                    100, 70, 210,
                    100, 70, 210,
                    100, 70, 210,
                    100, 70, 210,
                    100, 70, 210,
                    100, 70, 210,
                    // bottom of middle rung.
                    76, 210, 100,
                    76, 210, 100,
                    76, 210, 100,
                    76, 210, 100,
                    76, 210, 100,
                    76, 210, 100,
                    // right of bottom
                    140, 210, 80,
                    140, 210, 80,
                    140, 210, 80,
                    140, 210, 80,
                    140, 210, 80,
                    140, 210, 80,
                    // bottom
                    90, 130, 110,
                    90, 130, 110,
                    90, 130, 110,
                    90, 130, 110,
                    90, 130, 110,
                    90, 130, 110,
                    // left side
                    160, 160, 220,
                    160, 160, 220,
                    160, 160, 220,
                    160, 160, 220,
                    160, 160, 220,
                    160, 160, 220
                ])
            }
        }
    },
    // {
    //     type: Square,
    //     properties: {
    //         translation: [300, 200, 0],
    //         scale: [1, 1, 1],
    //         rotation: [0, 0, 0],
    //     },
    //     shaders: {
    //         vertexShader: squareVertexShader,
    //         fragmentShader: squareFragmentShader,
    //     },
    //     attributes: {
    //         a_position: {
    //             location: null
    //         }
    //     },
    //     uniforms: {
    //         u_position : {
    //             location: null,
    //             type: 'uniformMatrix4fv',
    //             data: null
    //         }
    //     },
    //     buffers: {
    //         position_buffer: {
    //             location: null,
    //             data: new Float32Array([
    //                 0, 0, 0,
    //                 0, 300, 0,
    //                 300, 0, 0,
    //                 300, 0, 0,
    //                 0, 300, 0,
    //                 300, 300, 0
    //             ])
    //         }
    //     }
    // }
];
export default sceneGraph;
//# sourceMappingURL=SceneGraph.js.map