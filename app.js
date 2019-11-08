'use strict';

const fs = require('fs');
const io = require('socket.io')(3001);


const util = require('util');
const fsRead = util.promisify(fs.readFile);
const fsWrite = util.promisify(fs.writeFile);


const alterFile = (file) => {
  fs.readFile( file, (err, data) => {
    if(err) { throw err; }
    let text = data.toString().toUpperCase();
    fs.writeFile( file, Buffer.from(text), (err, data) => {
      if(err) { throw err; }
      console.log(`${file} saved`);
    });
  });
};

const readFile = (filePath) => fsRead(filePath);
const writeFile = (filePath, buffer) => fsWrite(filePath, buffer);
const upperCase = (buffer) => {
  const convertedBuffer = buffer.toString().trim().toUpperCase();
  return Buffer.from(convertedBuffer);
}

const alterFile = (path) => {
  return readFile(path)
    .then(contents => upperCase(contents))
    .then(buffer => {
      return writeFile(path, buffer)
        .catch(e => client.write(`${events.WRITE_ERROR} ${e}`));
    })
    .then(() => client.write(`${events.WRITE_SUCCESS} ${path}`))
    .catch(e => client.write(`${events.READ_ERROR} ${e.text}`))
};


if (process.env.NODE_ENV !== 'test') {
  client.connect(3001, 'localhost', () => {
    console.log('Connected to tcp server');
    alterFile(file);
  });
}

module.exports = {
  readFile,
  writeFile,
  upperCase,
  alterFile,
}


let file = process.argv.slice(2).shift();
alterFile(file);
