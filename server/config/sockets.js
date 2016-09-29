module.exports = io => {
  io.on('connection', socket => {
    console.log('user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message', msg => {
      console.log('msg received: ', msg);
      socket.broadcast.emit('message', {
        msg,
        from: socket.id.slice(8)
      });
      
      socket.to('testroom').emit('message', msg);
    });
  });
};
