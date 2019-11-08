'use strict';

const io = require('socket.io-client');

const client = io.connect('http://localhost:3001');

client.on('file-save', (payload) => {
  console.log('hell yeah', payload);
});

client.on('file-error', (payload) => {
  console.log('hell nah', payload);
});

