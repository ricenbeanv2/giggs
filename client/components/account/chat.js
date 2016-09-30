import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { getUserList } from '../../actions/auth';
import SelectionComponent from '../selectionComponent';

const UserButton = props => {
  return <button onClick={() => props.switchRoom(props.username)}>{props.username}</button>;
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      users: [],
      room: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.switchRoom = this.switchRoom.bind(this);
  }

  //Change users passed in eventually to be all employees/employers related to
  //the user
  componentDidMount() {
    const usernames = [];
    this.props.getUserList([1, 2]).then(() => {
      this.props.auth.userList.forEach((user) => {
        usernames.push(user.username);
      });
      this.setState({ users: usernames });
    });

    socket.on('message', message => {
      console.log('message in mount:', message);
      this.setState({ messages: [message, ...this.state.messages] });
    });

    socket.emit('join', Cookies.getJSON('user').username);
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  switchRoom(username) {
    this.setState({ room: username });
  }
  sendMessage(e) {
    if (this.state.message !== '' && (e.charCode === 13 || e.type === 'click')) {
      const message = {
        body: this.state.message,
        from: Cookies.getJSON('user').username,
        id: Cookies.getJSON('user').userid
      };
      this.setState({ messages: [message, ...this.state.messages] });
      console.log('message: ', message);
      socket.emit('message', message);
      this.setState({ message: '' });
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}><b>{message.from}: </b>{message.body}</li>;
    });
    console.log('current room: ', this.state.room);
    return (
      <div className='chat'>
        <SelectionComponent />
        <div>
          {this.state.users.map((username, idx) => {
            return <UserButton switchRoom={this.switchRoom} key={idx} username={username} />;
          })}
        </div>
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { getUserList })(Chat);
