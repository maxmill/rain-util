const fs = require('co-fs');
const path = require('path');
const genify = require('thunkify-wrap').genify; // converts normal functions into generator functions
const mkdirp = genify(require('mkdirp')); // https://github.com/substack/node-mkdirp

module.exports = {
// creates dir only if it doesn't exist
    upsert: function*(dir) {
        typeof dir === 'string' && !(yield fs.exists(path.resolve(dir))) && (yield mkdirp(path.resolve(dir)));
        return path.resolve(dir);
    },
// expose object module from directory
    objectify: function* (dir, exclude, scope) {
        var whiteList = ['index.js'];
        var _module;

        if (exclude) {
            typeof exclude === 'string' && whiteList.push(exclude);
            Array.isArray(exclude) && whiteList.concat(exclude); // white listed files
        }

        dir = path.resolve(scope ? scope + '/' + dir : dir);


        return (yield fs.readdir(path.resolve(dir))).reduce(function (name) {
            _module = _module || {};

            if (name[0] === '.' || whiteList.indexOf(name) > -1) {
                return _module;
            }
            _module[name.split('.')[0]] = require(dir + '/' + name);
            return _module;
        });
    }
};