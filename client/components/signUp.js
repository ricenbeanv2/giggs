import React, { Component } from 'react';
import { render } from 'react-dom';

import InputBox from './inputBox';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {  name: '',
                    password: '',
                    passConfirm: '',
                    email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.userSubmit = this.userSubmit.bind(this);
  }

  handleChange(input, event) {
    let change = {};
    change[input] = event.target.value;
    this.setState(change);
  }

  userSubmit(event) {
    event.preventDefault();
  }
  renderForm() {
    return(
      <form onSubmit={this.userSubmit}>
        <InputBox input="name" value={this.state.name} place="Full Name" func={this.handleChange}/>
        <InputBox input="email" value={this.state.email} place="E-mail" func={this.handleChange}/>
        <InputBox input="password" value={this.state.password} place="Password" func={this.handleChange}/>
        <InputBox input="passConfirm" value={this.state.passConfirm} place="Confirm Password" func={this.handleChange}/>
        <button type="submit">Sign Up</button>
      </form>
    );
  }

  render() {
    return(
      this.renderForm()
    );
  }
}
