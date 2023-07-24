import REGL, { DrawCommand, Vec4 } from 'regl';
import parseObj from 'parse-wavefront-obj';
import createCamera from 'regl-camera';
import { vec3 } from 'gl-matrix';
import GUI from 'lil-gui';
import { createMesh } from './renderables/item/item';

const drawObjects: DrawCommand[] = [];

const regl = REGL();
const gui = new GUI();

interface Vars {
  skyColour: vec3
  scale: number;
  colour: vec3;
  diffuse: vec3;
  specular: vec3;
  shininess: number;
  lightAmbient: vec3;
  lightDiffuse: vec3;
  lightSpecular: vec3;
}

const vars: Vars = {
  skyColour:     [1, 1, 1],
  scale:         19,
  colour:        [1, 0.86, 0],
  diffuse:       [0.65, 0.60, 0],
  specular:      [1, 1, 1],
  shininess:     128,
  lightAmbient:  [1, 1, 1],
  lightDiffuse:  [1, 1, 1],
  lightSpecular: [1, 1, 1],
};

const skySettings = gui.addFolder('Sky');
skySettings.addColor(vars, 'skyColour');
const objectSettings = gui.addFolder('Object');
objectSettings.add(vars, 'scale', 0, 100, 0.5);
objectSettings.addColor(vars, 'colour');
objectSettings.addColor(vars, 'diffuse');
objectSettings.addColor(vars, 'specular');
objectSettings.add(vars, 'shininess', 1, 128, 1);
const lightSettings = gui.addFolder('Light Settings');
lightSettings.addColor(vars, 'lightAmbient');
lightSettings.addColor(vars, 'lightDiffuse');
lightSettings.addColor(vars, 'lightSpecular');

const camera = createCamera(regl, {
  center: vec3.fromValues(0, 0, 0),
});

async function addObject() {
  const response = await fetch('assets/bunny.obj');
  const mesh = parseObj(await response.text());
  drawObjects.push(createMesh({ regl, mesh }));
}

regl.frame(() =>
  camera(() => {
    regl.clear({ color:  [ ...vars.skyColour, 1] as Vec4 });
    drawObjects.forEach((a) => a({ ...vars }));
  }),
);

addObject().catch((e) => console.log(e));

