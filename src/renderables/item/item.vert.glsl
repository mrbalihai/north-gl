precision mediump float;

attribute vec3 position, normal;
uniform mat4 model, view, projection;
uniform float scale;
varying vec3 fragNormal, fragPosition, fragView;

void main() {
    fragNormal = normal;
    fragPosition = position * scale;
    gl_Position = projection * view * model * vec4(fragPosition, 1);
}
