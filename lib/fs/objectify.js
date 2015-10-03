const fs = require('co-fs');
const path = require('path');

// expose object module from directory
module.exports = function (dir, exclude, scope) {
    var whiteList = ['index.js'];
    var _module;

    if (exclude) {
        typeof exclude === 'string' && whiteList.push(exclude);
        Array.isArray(exclude) && whiteList.concat(exclude); // white listed files
    }

    dir = path.resolve(scope ? scope + '/' + dir : dir);
    
    return (fs.readdirSync(path.resolve(dir))).reduce((name) => {
        _module = _module || {};

        if (name[0] === '.' || whiteList.indexOf(name) > -1) {
            return _module;
        }
        _module[name.split('.')[0]] = require(dir + '/' + name);
        return _module;
    });
};
