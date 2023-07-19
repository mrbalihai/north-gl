import { mat4, vec3 } from 'gl-matrix';
import { Regl, DefaultContext } from 'regl';

interface Props {
  eye: vec3;
  target: vec3;
}

interface Uniforms {
  view: mat4;
  invertedView: mat4;
  projection: mat4;
}

type Context = Uniforms & DefaultContext;

export const createCamera = (regl: Regl, props: Props) =>
  regl<Uniforms, {}, Props>({
    context: {
      projection: (context: DefaultContext) =>
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
    },

    uniforms: {
      view: regl.context<Context, 'view'>('view'),
      invertedView: (context: Context): mat4 =>
        mat4.invert(mat4.create(), context.view),
      projection: regl.context<Context, 'projection'>('projection')
    }
  });
