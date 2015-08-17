const path = require('path');
const fs = require('fs');

module.exports = {
    path: {
        upsert: (dir) => {
            typeof dir === 'string' && !fs.existsSync(path.resolve(dir)) && fs.mkdirSync(path.resolve(dir));
            return path.resolve(dir);
        },
        objectify: (dir, exclude, scope) => { // expose object module
            var whitelist = ["index.js"];
            var _module;

            if (exclude) {
                typeof exclude === "string" && whitelist.push(exclude);
                Array.isArray(exclude) && whitelist.concat(exclude); // whitelisted files
            }

            dir = path.resolve(scope ? scope + '/' + dir : dir);

            return fs.readdirSync(path.resolve(dir)).reduce((name) => {
                _module = _module || {};

                if (name[0] === "." || whitelist.indexOf(name) > -1) {
                    return _module;
                }
                _module[name.split('.')[0]] = require(dir + '/' + name);
                return _module;
            });
        }
    }
};
