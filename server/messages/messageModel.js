const Sequelize = require('sequelize');
const connection = require('../db/connection');
const Users = require('../user/userModel');

//chatroom_name, user_id, message
const Messages = connection.define('Messages', {
  roomName: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
  },

  message: {
    type: Sequelize.STRING,
    allownull: false,
    notEmpty: true
  }
});

module.exports = Messages;
