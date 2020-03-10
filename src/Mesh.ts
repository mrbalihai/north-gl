export type Vec3 = [number, number, number];
export type Vec4 = [number, number, number, number];

import { vec4, vec3 } from 'gl-matrix';

export interface Mesh {
    positions: vec3[],
    cells: vec3[],
    faceUVs: vec4[],
    vertexUVs: vec3[],
    vertexNormals: vec3[],
    faceNormals: vec4[],
    name: string
}
