import virtualDom, { h } from 'virtual-dom';
import REGL, { DrawCommand } from 'regl';
import mainLoop from 'main-loop';
import parseObj from 'parse-wavefront-obj';
import createCamera from 'regl-camera';
import { createMesh } from './renderables/item';

const drawObjects: Array<DrawCommand> = new Array<DrawCommand>();
const loop = mainLoop({ }, render, virtualDom);
document.body.appendChild(loop.target);

function render() {
    return h('div', [
        h('button', { onclick: addCube }, 'Click'),
        h('canvas', { id: 'main-canvas', style: { display: 'block' }}, ''),
    ]);
};

const regl = REGL({ canvas: document.querySelector<HTMLCanvasElement>('#main-canvas')});
const camera = createCamera(regl, {
    center: [0, 2.5, 0]
});

async function addCube () {
    const response = await fetch('/assets/cube.obj');
    const mesh = parseObj(await response.text());
    drawObjects.push(createMesh(regl, mesh));
};

regl.frame(() =>
    camera(() => {
        regl.clear({ color: [1, 1, 1, 1] });
        drawObjects.forEach((a) => a());
    })
);
