const path = require('path');
const genify = require('thunkify-wrap').genify; // converts normal functions into generator functions
const mkdirp = genify(require('mkdirp')); // https://github.com/substack/node-mkdirp
const exists = genify(require('fs').exists);

// creates dir only if it doesn't exist
module.exports = function*(dir) {
    typeof dir === 'string' && !(yield exists(path.resolve(dir))) && (yield mkdirp(path.resolve(dir)));
    return path.resolve(dir);
};
