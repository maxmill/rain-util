const methods = require('./methods.esnext');
const download = require('./../download');
var fs = require('co-fs'); // use all async node core fs functions without callback hell


/**
 * @generators
 *  rename,ftruncate,chown,fchown,lchown,chmod,fchmod,stat,lstat,fstat,link,symlink,readlink,realpath,unlink,
 *  rmdir,mkdir,readdir,close,open,utimes,futimes,fsync,write,read,readFile,writeFile,appendFile,exists,createReadStream
 *
 * @functions:
 *  upsert,objectify,download
 */


fs.upsert = methods.upsert;
fs.objectify = methods.objectify;
fs.download = download;


module.exports = fs;
