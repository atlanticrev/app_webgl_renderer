export default /* glsl */`
// an attribute will receive data from a buffer
attribute vec2 a_position;

uniform vec2 u_resolution;

void main() {
    // from pixels to 0.0 <-> 1.0
    vec2 zeroToOne = a_position / u_resolution;
    // from 0.0 <-> 1.0 to 0.0 <-> 2.0
    vec2 zeroToTwo = zeroToOne * 2.0;
    // from 0.0 <-> 2.0 to -1.0 <-> 1.0
    vec2 clipSpace = zeroToTwo - 1.0;

    // gl_Position is a special variable a vertex shader is responsible for setting
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;
