import h = require('virtual-dom/h');
import REGL = require('regl');
import mainLoop = require('main-loop');
import virtualDom = require('virtual-dom');
import createScene = require('./scene');

const addCube = async () => {
    const response = await fetch('/assets/cube.obj');
    console.log(response.text());
};

//todo: object should be strongly typed
const loop = mainLoop({ }, render, virtualDom);
document.body.appendChild(loop.target);

function render() {
    return h('div', [
        h('button', { onClick: addCube }, 'Click'),
        h('canvas', { id: 'main-canvas', style: { display: 'block' }}, ''),
    ]);
};

const regl = REGL({ canvas: document.querySelector('#main-canvas') as HTMLCanvasElement });
const scene = createScene(regl);
regl.frame(() => {
    regl.clear({ color: [0, 0, 0, 1] });
    scene({ }, () => {
        // Perform draw actions
    });
});
