import { Regl, DefaultContext } from 'regl';
import { Mesh } from '../Mesh';
import { mat4, vec4, vec3 } from 'gl-matrix';

interface Uniforms {
    color: vec4;
    model: mat4;
    view: mat4;
    projection: mat4;
}

interface Attributes {
    position: vec3[];
    normal: vec3[];
}

type Context = Uniforms & DefaultContext;

export const createMesh = (regl: Regl, mesh: Mesh) =>
    regl<Uniforms, Attributes>({
        vert: `
            precision mediump float;
            attribute vec3 position;
            uniform mat4 model, view, projection;
            void main() {
                gl_Position = projection * view * model * vec4(position, 1);
            }
          `,

        frag: `
            precision mediump float;
            void main() {
                gl_FragColor = vec4(1, 0, 0, 1);
            }
           `,
        attributes: {
            position: mesh.positions,
            normal: mesh.vertexNormals
        },
        elements: mesh.cells,
        uniforms: {
            color: vec4.fromValues(1, 0, 0, 1),
            model: mat4.identity(mat4.create()),
            view: regl.context<Context, 'view'>('view'),
            projection: regl.context<Context, 'projection'>('projection')
        },
    });
