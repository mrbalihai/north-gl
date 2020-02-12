import { createCamera } from './camera';
import { Regl } from 'regl';

export const createScene = (regl: Regl, {}) => createCamera(regl, {
    eye: [2, 2, 2],
    target: [0, 0, 0]
});
