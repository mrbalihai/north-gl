import gl = require('gl-matrix');
import REGL = require('regl');
const mat4 = gl.mat4;

interface Props {
    eye: gl.vec3;
    target: gl.vec3;
}

interface Context extends REGL.DefaultContext {
    view: gl.mat4;
    projection: gl.mat4;
}

export = (regl: REGL.Regl) => regl<{}, REGL.Uniforms>({
    context: {
        projection: (context: REGL.DefaultContext) =>
            mat4.perspective(mat4.create(),
                Math.PI / 4,
                context.viewportWidth / context.viewportHeight,
                0.01,
                1000.0),

        view: ({}, props: Props) =>
            mat4.lookAt(mat4.create(),
                props.eye,
                props.target,
                [0, 1, 0]),

        eye: regl.prop<Props, 'eye'>('eye')
    },

    uniforms: {
        view: regl.context<Context, 'view'>('view'),
        invView: (context: Context) => mat4.invert(mat4.create(), context.view),
        projection: regl.context<Context, 'projection'>('projection')
    }
});
