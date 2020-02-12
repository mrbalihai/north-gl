import REGL from 'regl';
import { Mesh } from '../Mesh';
const regl = REGL();

interface Uniforms {
    color: [number, number, number, number];
}

interface Attributes {
    position: Array<[number, number, number]>;
}

export const createMesh = (mesh: Mesh) => regl<Uniforms, Attributes>({
    frag: `
        precision mediump float;
        attribute vec3 position;
        uniform mat4 model, view, projection;
        void main() {
            gl_Position = projection * view * model * vec4(position, 1);
        }
      `,

    vert: `
        precision mediump float;
        attribute vec2 position;
        void main () {
            gl_Position = vec4(position, 0, 1);
        }`,

    attributes: {
        position: mesh.positions
    },
    elements: mesh.cells,
    uniforms: {
        color: [1, 0, 0, 1]
    },
});
