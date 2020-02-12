declare module 'parse-wavefront-obj' {
    type Mesh = {
        positions: Array<[number, number, number]>,
        cells: Array<[number, number, number, number]>,
        faceUVs: Array<[number, number, number, number]>,
        vertexUVs: Array<[number, number, number]>,
        vertexNormals: Array<[number, number, number]>,
        faceNormals: Array<[number, number, number, number]>,
        name: string
    }

    function parse(data: string): Mesh;

    export = parse;
}
