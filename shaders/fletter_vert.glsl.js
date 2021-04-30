export default /* glsl */`
attribute vec4 a_position;
attribute vec4 a_color;
uniform mat4 u_position;
varying vec4 v_color;

void main() {
    // Matrix * column vector
    gl_Position = u_position * a_position;
    // v_color = gl_Position * 0.5 + 0.5;
    v_color = a_color;
}
`;
