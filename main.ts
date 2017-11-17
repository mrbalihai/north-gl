import h = require('virtual-dom/h');
import resl = require('resl');
import regl = require('regl');
import mainLoop = require('main-loop');
import virtualDom = require('virtual-dom');
import parseObj = require('parse-wavefront-obj');
import createScene = require('./src/scene');

let cubes = [];
const addCube = () => {
    resl({
        manifest: {
            'cube': {
                type: 'text',
                src: './assets/cube.obj',
                parser: parseObj
            }
        },
        onDone: (assets) => {
            cubes.push(assets.cube);
        }
    })
};

const loop = mainLoop({ }, render, virtualDom);
document.body.appendChild(loop.target);

function render(state) {
    return h('div', [
        h('button', { onClick: addCube }, 'Click'),
        h('canvas', { id: 'main-canvas', style: { display: 'block' }}),
    ]);
};

const reglContext = regl(document.querySelector('#main-canvas'));
const scene = createScene(reglContext);
reglContext.frame(() => {
    reglContext.clear({ color: [0, 0, 0, 1] });
    scene({ }, () => {
        // Perform draw actions
    });
});
