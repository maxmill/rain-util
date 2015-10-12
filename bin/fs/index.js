'use strict';

var fs = require('co-fs');
var rimraf = require('rimraf');
var genify = require('thunkify-wrap').genify;
var objectify = require('./objectify');
var download = require('./download');
var upsert = require('./upsert.esnode');
var fetch = require('./fetch.esnode');
var jsonFile = require('jsonfile');

/**
 *  extend co-fs in order to have the following by default (as generators)
 *
 *  rename,ftruncate,chown,fchown,lchown,chmod,fchmod,stat,lstat,fstat,link,symlink,readlink,realpath,unlink,
 *  rmdir,mkdir,readdir,close,open,utimes,futimes,fsync,write,read,readFile,writeFile,appendFile,exists,createReadStream
 *
 *  download and objectify are not generator functions
 */

fs.rimraf = genify(rimraf);
fs.objectify = objectify;
fs.download = download;
fs.upsert = upsert;
fs.fetch = fetch;

fs.json = {
  read: genify(jsonFile.readFile),
  write: genify(jsonFile.writeFile)
};

module.exports = fs;