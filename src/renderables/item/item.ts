import { Regl, DefaultContext } from 'regl';
import { Mesh } from '../../Mesh';
import { mat4, vec4, vec3 } from 'gl-matrix';
import normals from 'angle-normals';
import vert from './item.vert.glsl';
import frag from './item.frag.glsl';

interface Uniforms {
  model: mat4;
  view: mat4;
  eye: vec3;
  projection: mat4;
  skyColour: vec3;
  'directionalLight.direction': vec3;
  'directionalLight.ambient': vec3;
  'directionalLight.diffuse': vec3;
  'directionalLight.specular': vec3;
  'material.color': vec4;
  'material.diffuse': vec3;
  'material.specular': vec3;
  'material.shininess': number;
}

interface Attributes {
  position: vec3[];
  normal: vec3[];
}

type Context = Uniforms & DefaultContext;
type Args = { regl: Regl, mesh: Mesh };

export const createMesh = ({ regl, mesh }: Args) =>
  regl<Uniforms, Attributes>({
    vert,
    frag,
    attributes: {
      position: mesh.positions,
      normal: normals(mesh.cells, mesh.positions),
    },
    elements: mesh.cells,
    uniforms: {
      'directionalLight.direction': vec3.fromValues(-0.2, -1, -0.3),
      'directionalLight.ambient': vec3.fromValues(0.4, 0.4, 0.4),
      'directionalLight.diffuse': vec3.fromValues(0.4, 0.4, 0.4),
      'directionalLight.specular': vec3.fromValues(0.1, 0.1, 0.1),
      'material.color': vec4.fromValues(1, 1, 1, 1),
      'material.diffuse': vec3.fromValues(0.4, 0.4, 0.4),
      'material.specular': vec3.fromValues(0.1, 0.1, 0.1),
      'material.shininess': 30,
      model: mat4.identity(mat4.create()),
      eye: regl.context<Context, 'eye'>('eye'),
      view: regl.context<Context, 'view'>('view'),
      skyColour: regl.prop<Context, 'skyColour'>('skyColour'),
      projection: regl.context<Context, 'projection'>('projection'),
    },
  });
