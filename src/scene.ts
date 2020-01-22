import camera = require('./camera');
import REGL = require('regl');

export = (regl: REGL.Regl) => camera(regl);
