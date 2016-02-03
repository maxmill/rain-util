const path = require('path');
const genify = require('thunkify-wrap').genify; // converts normal functions into generator functions
const mkdirp = genify(require('mkdirp')); // https://github.com/substack/node-mkdirp
const exists = genify(require('fs').exists);
const _forEach = require('array-generators').forEach;

function* createIfMissing(d) {
    !(yield exists(path.resolve(d))) && (yield mkdirp(path.resolve(d)));
}

// creates dir only if it doesn't exist
module.exports = function* (dir) {
    if (typeof dir === 'string') {
        yield createIfMissing(dir);
        return path.resolve(dir);
    } else if (Array.isArray(dir)) {
        yield _forEach(dir, createIfMissing);
        return dir.map((d)=>path.resolve(d));
    }
};