const Message = require('./messageModel');

module.exports = {
  createMessage: (req, res) => {
    const newMsg = {
      roomName: req.body.roomName,
      user_id: req.body.user_id,
      message: req.body.message,
      username: req.body.username
    };

    Message.create(newMsg).then(msg => {
      console.log('msg: ', msg);
      res.status(201).send(msg);
    })
    .catch(err => {
      res.status(500).send(`Message not created ${err}`);
    });
  },

  retrieveHistory: (req, res) => {
    Message.findAll({ where: { roomName: req.query.roomName } })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => res.status(500).send('History not found', err));
  }
};
