export type Vec3 = [number, number, number];
export type Vec4 = [number, number, number, number];

import { vec4, vec3 } from 'gl-matrix';

export interface Mesh {
    positions: Array<vec3>,
    cells: Array<vec4>,
    faceUVs: Array<vec4>,
    vertexUVs: Array<vec3>,
    vertexNormals: Array<vec3>,
    faceNormals: Array<vec4>,
    name: string
}
