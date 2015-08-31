var fs = require('co-fs');
var path = require('path');

module.exports = {
// creates dir only if it doesn't exist
    upsert: function*(dir) {
        typeof dir === 'string' && !(yield fs.exists(path.resolve(dir))) && (yield fs.mkdir(path.resolve(dir)));
        return path.resolve(dir);
    },
    objectify:function* (dir, exclude, scope) { // expose object module
        var whitelist = ["index.js"];
        var _module;

        if (exclude) {
            typeof exclude === "string" && whitelist.push(exclude);
            Array.isArray(exclude) && whitelist.concat(exclude); // whitelisted files
        }

        dir = path.resolve(scope ? scope + '/' + dir : dir);


        return (yield fs.readdir(path.resolve(dir))).reduce(function(name){
            _module = _module || {};

            if (name[0] === "." || whitelist.indexOf(name) > -1) {
                return _module;
            }
            _module[name.split('.')[0]] = require(dir + '/' + name);
            return _module;
        });
    }
};