import REGL, { DrawCommand, Vec4 } from 'regl';
import parseObj from 'parse-wavefront-obj';
import createCamera from 'regl-camera';
import { vec3 } from 'gl-matrix';
import GUI from 'lil-gui';
import { createMesh } from './renderables/item/item';

const drawObjects: Array<DrawCommand> = new Array<DrawCommand>();

const regl = REGL();
const gui = new GUI();

type Vars = {
  skyColour: vec3
  colour: vec3;
  diffuse: vec3;
  specular: vec3;
  shininess: number;
  lightAmbient: vec3;
  lightDiffuse: vec3;
  lightSpecular: vec3;
};

const vars: Vars = {
  skyColour: [1, 1, 1],
  colour: [1, 1, 1],
  diffuse: [0.4, 0.4, 0.4],
  specular: [0.1, 0.1, 0.1],
  shininess: 30,
  lightAmbient: [0.4, 0.4, 0.4],
  lightDiffuse: [0.4, 0.4, 0.4],
  lightSpecular: [0.1, 0.1, 0.1],
};

const skySettings = gui.addFolder('Sky')
skySettings.addColor(vars, 'skyColour');
const cubeSettings = gui.addFolder('Cube')
cubeSettings.addColor(vars, 'colour')
cubeSettings.addColor(vars, 'diffuse')
cubeSettings.addColor(vars, 'specular')
cubeSettings.add(vars, 'shininess', 1, 128, 1);
const lightSettings = gui.addFolder('Light Settings')
lightSettings.addColor(vars, 'lightAmbient')
lightSettings.addColor(vars, 'lightDiffuse')
lightSettings.addColor(vars, 'lightSpecular')

const camera = createCamera(regl, {
  center: vec3.fromValues(0, 0, 0)
});

async function addCube () {
  const response = await fetch('assets/cube.obj');
  const mesh = parseObj(await response.text());
  drawObjects.push(createMesh({ regl, mesh }));
};

regl.frame(() =>
  camera(() => {
    regl.clear({ color:  [ ...vars.skyColour, 1] as Vec4 });
    drawObjects.forEach((a) => a({ ...vars }));
  })
);

addCube();

