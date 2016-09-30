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
    return (
      <div className='chat'>
        <form onSubmit={this.sendMessage}>
          <div className='message-box'>
            {messages}
          </div>
          <div className='text-box'>
            <textarea type='text' rows='1' cols='30' style={{ resize: 'none' }} placeholder='Enter a message...' value={this.state.message} onChange={this.handleChange.bind(this, 'message')} onKeyPress={this.sendMessage}/>
            <input type='button' value='send' onClick={this.sendMessage} />
          </div>
        </form>
      </div>
    );
  }
}
