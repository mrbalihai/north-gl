import { mat4 } from 'gl-matrix';
import { Regl, DefaultContext } from 'regl';

interface Props {
    eye: number[];
    target: number[];
}

interface Context extends DefaultContext {
    view: mat4;
    invView: mat4;
    projection: number[];
}

interface Uniforms {
    view: mat4;
    invView: mat4;
    projection: number[];
}

export const createCamera = (regl: Regl, props: Props) =>
    regl<Uniforms, {}, Props>({
        context: {
            projection: (context: Context) =>
                mat4.perspective(mat4.create(),
                    Math.PI / 4, // FOV
                    context.viewportWidth / context.viewportHeight, // Viewport
                    0.01, // Near
                    1000.0), // Far

            view: ({}) =>
                mat4.lookAt(mat4.create(),
                    props.eye,
                    props.target,
                    [0, 1, 0]),
            eye: regl.prop<Props, 'eye'>('eye')
        },

        uniforms: {
            view: regl.context<Context, 'view'>('view'),
            invView: (context: Context): mat4 => mat4.invert(mat4.create(), context.view),
            projection: regl.context<Context, 'projection'>('projection')
        }
    });
