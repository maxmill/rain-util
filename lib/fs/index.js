const methods = require('./methods.esnext');
const download = require('./download');
const fs = require('co-fs');
const rimraf = require('rimraf');
const genify = require('thunkify-wrap').genify;
/**
 *  extend co-fs in order to have the following by default (as generators)
 *
 *  rename,ftruncate,chown,fchown,lchown,chmod,fchmod,stat,lstat,fstat,link,symlink,readlink,realpath,unlink,
 *  rmdir,mkdir,readdir,close,open,utimes,futimes,fsync,write,read,readFile,writeFile,appendFile,exists,createReadStream
 */

fs.upsert = methods.upsert;
fs.objectify = methods.objectify;
fs.download = genify(download); // keeping it a non-generator for now
fs.rimraf = genify(rimraf);

module.exports = fs;
