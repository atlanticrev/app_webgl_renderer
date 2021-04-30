export default /* glsl */`
attribute vec2 a_position;

uniform mat4 u_position;

varying vec4 v_color;

void main() {
    // Matrix * column vector
    gl_Position = u_position * vec4(a_position, 0, 1);
    // Color based on gl_Position value
    v_color = gl_Position * 0.5 + 0.5;
}
`;
