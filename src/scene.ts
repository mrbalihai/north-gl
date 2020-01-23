import camera = require('./camera');
import REGL = require('regl');

export = (regl: REGL.Regl) => camera(regl, {
    eye: [2, 2, 2],
    target: [0, 0, 0]
});
