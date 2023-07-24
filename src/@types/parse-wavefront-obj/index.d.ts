declare module 'parse-wavefront-obj' {
  import { vec3, vec4 } from 'gl-matrix';

  interface Mesh {
    positions: vec3[],
    cells: vec3[],
    faceUVs: vec4[],
    vertexUVs: vec3[],
    vertexNormals: vec3[],
    faceNormals: vec4[],
    name: string
  }

  function parse(data: string): Mesh;

  export = parse;
}
