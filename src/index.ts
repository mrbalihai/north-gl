import h = require('virtual-dom/h');
import REGL = require('regl');
import mainLoop = require('main-loop');
import virtualDom = require('virtual-dom');
import parseObj = require('parse-wavefront-obj');
import createScene = require('./scene');

interface Mesh {
    positions: Number[],
    cells: Number[],
    faceUVs: Number[],
    vertexUVs: Number[],
    vertexNormals: Number[],
    faceNormals: Number[],
    name: string
}

const cubes: Array<Mesh> = new Array<Mesh>();

const addCube = async () => {
    const response = await fetch('/assets/cube.obj');
    const cube = parseObj(await response.text());
    cubes.push(cube);
};

const loop = mainLoop({ }, render, virtualDom);
document.body.appendChild(loop.target);

function render() {
    return h('div', [
        h('button', { onclick: addCube }, 'Click'),
        h('canvas', { id: 'main-canvas', style: { display: 'block' }}, ''),
    ]);
};

const regl = REGL({ canvas: document.querySelector('#main-canvas') as HTMLCanvasElement });
const scene = createScene(regl);
regl.frame(() => {
    regl.clear({ color: [0, 0, 0, 1] });
    scene({ }, () => {
        // todo: draw array of cube meshes
    });
});
