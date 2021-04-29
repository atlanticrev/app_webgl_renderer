import vertexShader from "./shaders/object_to_draw_vert.glsl.js";
import fragmentShader from "./shaders/object_to_draw_frag.glsl.js";
import FLetter from "./objects/FLetter.js";
import Square from "./objects/Square.js";
const sceneGraph = [
    {
        type: Square,
        properties: {
            translation: [300, 200, 0],
            scale: [1, 1],
            rotation: 45,
        },
        shaders: {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        },
        attributes: {
            a_position: {
                location: null
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
                    0, 0,
                    0, 300,
                    300, 0,
                    300, 0,
                    0, 300,
                    300, 300
                ])
            }
        }
    },
    {
        type: FLetter,
        properties: {
            translation: [800, 500],
            scale: [1.25, 1.25],
            rotation: 0,
        },
        shaders: {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        },
        attributes: {
            a_position: {
                location: null,
                type: 'uniform2fv'
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
                    // left column
                    0, 0,
                    30, 0,
                    0, 150,
                    0, 150,
                    30, 0,
                    30, 150,
                    // top rung
                    30, 0,
                    100, 0,
                    30, 30,
                    30, 30,
                    100, 0,
                    100, 30,
                    // middle rung
                    30, 60,
                    67, 60,
                    30, 90,
                    30, 90,
                    67, 60,
                    67, 90,
                ])
            }
        }
    }
];
export default sceneGraph;
//# sourceMappingURL=SceneGraph.js.map