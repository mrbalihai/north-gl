export type Vec3 = [number, number, number];
export type Vec4 = [number, number, number, number];

export interface Mesh {
    positions: Vec3[],
    cells: Vec4[],
    faceUVs: Vec4[],
    vertexUVs: Vec3[],
    vertexNormals: Vec3[],
    faceNormals: Vec4[],
    name: string
}
