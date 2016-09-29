module.exports = io => {
  io.on('connection', socket => {
    console.log('user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message', msg => {
      console.log('msg received: ', msg);
      socket.join('calvin');
      socket.to('calvin').emit({
        body: msg.body,
        from: 'Other user'
      });
    });
  });
};
