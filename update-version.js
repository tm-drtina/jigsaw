/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const rimraf = require('rimraf');
const ncp = require('ncp');
const pjson = require('./package.json');

const from = 'dist-template';
const to = 'dist';

rimraf.sync(to);
ncp(from, to, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Update version number...');
        const file = `${to}/index.html`;
        const data = fs.readFileSync(file, 'utf8');
        const result = data.replace(/%VERSION%/g, pjson.version);
        fs.writeFileSync(file, result, 'utf8');
        console.log('Done.');
    }
});
