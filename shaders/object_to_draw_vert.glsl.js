export default /* glsl */`
// an attribute will receive data from a buffer
attribute vec2 a_position;

uniform vec2 u_resolution;
uniform vec2 u_scale;
uniform vec2 u_rotation;
uniform vec2 u_translation;

varying vec4 v_color;

void main() {
    // Scale
    vec2 scaled = a_position * u_scale;

    // Rotation
    vec2 rotated = vec2(
        scaled.x * u_rotation.y + scaled.y * u_rotation.x,
        scaled.y * u_rotation.y - scaled.x * u_rotation.x
    );
    
    // Translation
    vec2 translated = rotated + u_translation;

    // Clipping
    // from 0.0 <-> X to 0.0 <-> 1.0
    vec2 zeroToOne = translated / u_resolution;
    // from 0.0 <-> 1.0 to 0.0 <-> 2.0
    vec2 zeroToTwo = zeroToOne * 2.0;
    // from 0.0 <-> 2.0 to -1.0 <-> 1.0
    vec2 clipSpace = zeroToTwo - 1.0;
    
    // Reflection by Y
    vec2 reflected = clipSpace * vec2(1, -1);

    // gl_Position is a special variable a vertex shader is responsible for setting
    gl_Position = vec4(reflected, 0, 1);
    
    // Color based on gl_Position value
    v_color = gl_Position * 0.5 + 0.5;
}
`;
