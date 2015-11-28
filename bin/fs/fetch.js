'use strict';

const fs = require('co-fs');
const path = require('path');

//read file or directory contents
module.exports = function* (p) {
    var stat = yield fs.lstat(p);
    var out;
    if (stat.isDirectory()) {
        out = yield fs.readdir(p);
    } else if (stat.isFile()) {
        out = yield fs.readFile(p);
    }
    return out;
};