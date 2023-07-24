import { vec3 } from 'gl-matrix';

export interface DirectionalLight {
  direction: vec3;
  ambient: vec3;
  diffuse: vec3;
  specular: vec3;
}
