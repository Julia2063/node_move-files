/* eslint-disable no-console */

const { rename } = require('fs/promises');
const { statSync, existsSync } = require('fs');
const path = require('path');

async function app() {
  const args = process.argv.slice(2);
  const [source, destination] = args;

  if (!source || !destination) {
    console.error(`Two arguments was needed`);

    return;
  }

  try {
    const isDir =
      existsSync(destination) && statSync(destination).isDirectory();

    const finDest = isDir
      ? path.join(destination, path.basename(source))
      : destination;

    await rename(source, finDest);
    console.log(`${source} was moved to ${destination}`);
  } catch (e) {
    console.error(`The file could not be moved. Error: ${e}`);
  }
}

app();

module.exports = { app };
