import REGL, { DrawCommand, Vec4 } from 'regl';
import parseObj from 'parse-wavefront-obj';
import createCamera from 'regl-camera';
import { vec3, vec4 } from 'gl-matrix';
import GUI from 'lil-gui';
import { createMesh } from './renderables/item/item';

const drawObjects: Array<DrawCommand> = new Array<DrawCommand>();

const regl = REGL();
const gui = new GUI();

type Vars = {
  skyColour: vec3
};

const vars: Vars = {
  skyColour: [1, 1, 1],
};

const folder = gui.addFolder('skyColour');
folder.addColor(vars, 'skyColour');

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

