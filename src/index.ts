import REGL, { DrawCommand } from 'regl';
import parseObj from 'parse-wavefront-obj';
import createCamera from 'regl-camera';
import { createMesh } from './renderables/item/item';
import { vec3 } from 'gl-matrix';

const drawObjects: Array<DrawCommand> = new Array<DrawCommand>();

const regl = REGL();
const camera = createCamera(regl, {
    center: vec3.fromValues(0, 2.5, 0)
});

async function addCube () {
    const response = await fetch('assets/cube.obj');
    const mesh = parseObj(await response.text());
    drawObjects.push(createMesh(regl, mesh));
};

regl.frame(() =>
    camera(() => {
        regl.clear({ color: [0, 0, 0, 1] });
        drawObjects.forEach((a) => a());
    })
);

addCube();
