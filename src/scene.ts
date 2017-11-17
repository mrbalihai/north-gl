import camera = require('./camera');

export = (regl) => regl({}, () => {
    camera(regl);
});
