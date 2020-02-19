declare module 'parse-wavefront-obj' {
    import { vec3, vec4 } from 'gl-matrix';

    type Mesh = {
        positions: Array<vec3>,
        cells: Array<vec4>,
        faceUVs: Array<vec4>,
        vertexUVs: Array<vec3>,
        vertexNormals: Array<vec3>,
        faceNormals: Array<vec4>,
        name: string
    }

    function parse(data: string): Mesh;

    export = parse;
}
