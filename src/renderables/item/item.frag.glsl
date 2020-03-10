precision mediump float;

#pragma glslify: calcDirectionalLight = require(../../glsl/calc-directional-light)
#pragma glslify: DirectionalLight = require(../../glsl/DirectionalLight)
#pragma glslify: Material = require(../../glsl/Material)

varying vec3 fragNormal, fragPosition;
uniform vec3 eye;
uniform DirectionalLight directionalLight;
uniform Material material;

void main() {
    vec3 norm = normalize(fragNormal);
    vec3 viewDirection = normalize(eye - fragPosition);
    vec3 light = calcDirectionalLight(directionalLight, material, norm, viewDirection);
    gl_FragColor = vec4(light, 1.0);
}
