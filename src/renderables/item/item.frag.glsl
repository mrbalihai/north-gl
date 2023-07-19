precision mediump float;

#include "../../glsl/DirectionalLight.glsl"
#include "../../glsl/Material.glsl"
#include "../../glsl/calc-directional-light.glsl"

varying vec3 fragNormal, fragPosition;
uniform vec3 eye;
uniform vec3 skyColour;
uniform DirectionalLight directionalLight;
uniform Material material;

void main() {
    vec3 norm = normalize(fragNormal);
    vec3 viewDirection = normalize(eye - fragPosition);
    vec3 light = calcDirectionalLight(directionalLight, material, norm, viewDirection);

    // Calculate the sky colour contribution
    vec3 skyColourContribution = skyColour * pow(max(dot(norm, viewDirection), 0.0), 2.0);

    // Mix the sky colour contribution with the directional light contribution
    vec3 finalColour = mix(skyColourContribution, light, 0.7);

    gl_FragColor = vec4(finalColour, 1.0);

}
