const util = require('util');
const fs = require('fs-extra');
const zipFolder = util.promisify(require('zip-folder'));

const archiveName = 'archive';
const dirName = __dirname;

async function run() {
  try {
    await fs.remove(`${dirName}/${archiveName}.zip`);
    await zipFolder(dirName, `${dirName}/${archiveName}.zip`);
  } catch (err) {
    console.log(err);
  }
}

run();
