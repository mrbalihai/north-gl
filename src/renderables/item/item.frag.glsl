precision mediump float;

#include "../../glsl/DirectionalLight.glsl"
#include "../../glsl/Material.glsl"
#include "../../glsl/calc-directional-light.glsl"

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
