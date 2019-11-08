'use strict';

const io = require('socket.io')(3001);

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('file-error', payload => io.emit('there has been an error', payload));
  socket.on('file-save', payload => io.emit('file has been saved', payload));
});

