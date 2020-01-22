declare module 'parse-wavefront-obj' {
    type Mesh = {
        positions: Number[],
        cells: Number[],
        faceUVs: Number[],
        vertexUVs: Number[],
        vertexNormals: Number[],
        faceNormals: Number[],
        name: string
    }

    function parse(data: string): Mesh;

    export = parse;
}
