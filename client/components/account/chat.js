import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const roomId = Cookies.getJSON('user').userid + Cookies.getJSON.username;
    socket.on('message', message => {
      console.log('message in mount:', message);
      this.setState({ messages: [message, ...this.state.messages] });
    });
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  sendMessage(e) {
    if (this.state.message !== '' && (e.charCode === 13 || e.type === 'click')) {
      const message = {
        body: this.state.message,
        from: Cookies.getJSON('user').username,
        id: Cookies.getJSON('user').userid
      };
      this.setState({ messages: [message, ...this.state.messages] });
      console.log('cookie', Cookies.getJSON('user').username);
      socket.emit('message', message);
      // event.target.value = '';
    }
  }
  render() {
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}><b>{message.from}: </b>{message.body}</li>;
    });
    return (
      <div>
        <form onSubmit={this.sendMessage}>
          <textarea type='text' rows='5' cols='30' style={{ resize: 'none' }}placeholder='Enter a message...' value={this.state.message} onChange={this.handleChange.bind(this, 'message')} onKeyPress={this.sendMessage}/>
          {messages}
          <input type='button' value='send' onClick={this.sendMessage} />
        </form>
      </div>
    );
  }
}
