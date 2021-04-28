export default /* glsl */`
attribute vec2 a_position;

uniform vec2 u_resolution;
uniform mat4 u_position;

varying vec4 v_color;

void main() {
    vec4 transformed = u_position * vec4(a_position, 0, 1);
    
    // Clipping
    // from 0.0 <-> X to 0.0 <-> 1.0
    vec2 zeroToOne = vec2(transformed.xy) / u_resolution;
    // from 0.0 <-> 1.0 to 0.0 <-> 2.0
    vec2 zeroToTwo = zeroToOne * 2.0;
    // from 0.0 <-> 2.0 to -1.0 <-> 1.0
    vec2 clipSpace = zeroToTwo - 1.0;
    
    // Reflection by Y
    vec2 reflected = clipSpace * vec2(1, -1);

    gl_Position = vec4(reflected, 0, 1);
    
    // Color based on gl_Position value
    v_color = gl_Position * 0.5 + 0.5;
}
`;
