import { createCamera } from './camera';
import { Regl } from 'regl';
import { vec3 } from 'gl-matrix';

export const createScene = (regl: Regl, {}) => createCamera(regl, {
    eye: vec3.fromValues(2, 2, 2),
    target: vec3.fromValues(0, 0, 0)
});
