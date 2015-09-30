const fs = require('co-fs');
const rimraf = require('rimraf');
const genify = require('thunkify-wrap').genify;

/**
 *  extend co-fs in order to have the following by default (as generators)
 *
 *  rename,ftruncate,chown,fchown,lchown,chmod,fchmod,stat,lstat,fstat,link,symlink,readlink,realpath,unlink,
 *  rmdir,mkdir,readdir,close,open,utimes,futimes,fsync,write,read,readFile,writeFile,appendFile,exists,createReadStream
 */


fs.rimraf = genify(rimraf);

module.exports = fs;
