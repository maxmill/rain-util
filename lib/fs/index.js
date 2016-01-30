const fs = require('co-fs');
const rimraf = require('rimraf');
const genify = require('thunkify-wrap').genify;
const download = require('./download');
const upsert = require('./upsert');
const fetch = require('./fetch');
const jsonFile = require('jsonfile');


fs.rimraf = genify(rimraf);
fs.download = download;
fs.upsert = upsert;
fs.fetch = fetch;

fs.json = {
    read: genify(jsonFile.readFile),
    write: genify(jsonFile.writeFile)
};

module.exports = fs;
