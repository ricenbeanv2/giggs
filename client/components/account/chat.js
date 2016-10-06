import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Select from 'react-select-plus';
import { connect } from 'react-redux';
import { getUserList } from '../../actions/auth';
import { getHistory, sendMessage } from '../../actions/chat';
import { getEmployers, getEmployees } from '../../actions/applicants';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      users: [],
      room: '',
      selected: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.switchRoom = this.switchRoom.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const relationships = [];
    this.props.getEmployers(Cookies.getJSON('user').userid).then(() => {
      relationships.push(...this.props.apply.employers);
      this.props.getEmployees(Cookies.getJSON('user').userid).then(() => {
        relationships.push(...this.props.apply.employees);
        this.props.getUserList(relationships).then(() => {
          const usernames = this.props.auth.userList.map(user => user.username);
          this.setState({ users: usernames });
        });
      });
    });

    socket.on('message', message => {
      const newMessages = this.state.messages;
      newMessages.push(message);
      this.setState({ newMessages });
    });
  }

  onChange(value) {
    this.setState({ selected: value.value });
    this.switchRoom(value.value);
  }

  handleChange(name, e) {
    const change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  switchRoom(username) {
    const chatRoom = [Cookies.getJSON('user').username, username].sort().join('');
    this.setState({ room: chatRoom });
    socket.emit('join', chatRoom);
    this.props.getHistory(chatRoom).then(() => {
      this.setState({ messages: this.props.chat.history });
    });
  }

  sendMessage(e) {
    if (this.state.message !== '' && (e.charCode === 13 || e.type === 'click')) {
      const message = {
        message: this.state.message,
        username: Cookies.getJSON('user').username,
        id: Cookies.getJSON('user').userid,
        roomName: this.state.room
      };
      const newMessages = this.state.messages;
      newMessages.push(message);
      this.setState({ messages: newMessages });
      socket.emit('message', message);
      this.props.sendMessage(this.state.room, message.message);
      this.setState({ message: '' });
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}><b>{message.username}: </b>{message.message}</li>;
    });

    const options = this.state.users.map(user => {
      return { value: user, label: user };
    });
    return (
      <div className='chat'>
        <Select onChange={this.onChange} options={options} value={this.state.selected} />
        <form onSubmit={this.sendMessage}>
          <div className='message-box'>
            {messages}
          </div>
          <div className='text-box'>
            <textarea type='text' rows='1' cols='30' style={{ resize: 'none' }} placeholder='Enter a message...' value={this.state.message} onChange={this.handleChange.bind(this, 'message')} onKeyPress={this.sendMessage} />
            <input type='button' value='send' onClick={this.sendMessage} />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, apply, chat }) => {
  return { auth, apply, chat };
};

export default connect(mapStateToProps, { getUserList, getEmployers, getEmployees, getHistory, sendMessage })(Chat);
