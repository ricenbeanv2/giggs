module.exports = io => {
  io.on('connection', socket => {
    console.log('user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('join', name => {
      console.log('Joined: ', name);
      socket.join(name);
    });

    socket.on('message', msg => {
      console.log('msg received: ', msg);
      socket.broadcast.to(msg.roomName).emit('message', msg);
    });
  });
};
