'use strict';

var fs = require('co-fs');
var rimraf = require('rimraf');
var genify = require('thunkify-wrap').genify;
var objectify = require('./objectify');
var upsert = require('./upsert.esnode');
var gather = require('./gather.esnode');

/**
 *  extend co-fs in order to have the following by default (as generators)
 *
 *  rename,ftruncate,chown,fchown,lchown,chmod,fchmod,stat,lstat,fstat,link,symlink,readlink,realpath,unlink,
 *  rmdir,mkdir,readdir,close,open,utimes,futimes,fsync,write,read,readFile,writeFile,appendFile,exists,createReadStream
 */

fs.rimraf = genify(rimraf);
fs.objectify = objectify;
fs.upsert = upsert;
fs.gather = gather;
module.exports = fs;