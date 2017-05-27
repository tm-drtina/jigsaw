/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const nrc = require('node-run-cmd');
const rimraf = require('rimraf');
const ncp = require('ncp');
const pjson = require('./package.json');

const from = 'dist';
const to = 'deploy';

const updateVersion = function () {
    const file = `${to}/index.html`;
    const data = fs.readFileSync(file, 'utf8');
    const result = data.replace(/%VERSION%/g, pjson.version);
    fs.writeFileSync(file, result, 'utf8');
};

rimraf.sync(to);
ncp(from, to, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Update version number...');
        updateVersion();
        console.log('Commit new version...');
        nrc.run([
            'git add deploy/*',
            `git commit deploy/* -m "Deploy version ${pjson.version}."`,
            'git subtree push --prefix deploy origin gh-pages'
        ], {});
        console.log('Done.');
    }
});
