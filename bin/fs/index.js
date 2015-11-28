'use strict';

const fs = require('co-fs');
const rimraf = require('rimraf');
const genify = require('thunkify-wrap').genify;
const objectify = require('./objectify');
const download = require('./download');
const upsert = require('./upsert');
const fetch = require('./fetch');
const jsonFile = require('jsonfile');

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