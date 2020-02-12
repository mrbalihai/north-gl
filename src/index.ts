import virtualDom, { h } from 'virtual-dom';
import REGL from 'regl';
import mainLoop from 'main-loop';
import parseObj from 'parse-wavefront-obj';
import { createCamera } from './camera';
import { Mesh } from './Mesh';

const meshes: Array<Mesh> = new Array<Mesh>();

const addCube = async () => {
    const response = await fetch('/assets/cube.obj');
    const mesh = parseObj(await response.text());
    console.log(mesh);
    meshes.push(mesh);
};

const loop = mainLoop({ }, render, virtualDom);
document.body.appendChild(loop.target); function render() {
    return h('div', [
        h('button', { onclick: addCube }, 'Click'),
        h('canvas', { id: 'main-canvas', style: { display: 'block' }}, ''),
    ]);
};

const regl = REGL({ canvas: document.querySelector('#main-canvas') as HTMLCanvasElement });
regl.frame(() => {
    regl.clear({ color: [0, 0, 0, 1] });
    createCamera(regl, {
        eye: [2, 2, 2],
        target: [0, 0, 0]
    });
});
