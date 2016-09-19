import React, { Component } from 'react';
import { render } from 'react-dom';

import inputField from './inputField';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {  name: '',
                    password: '',
                    passConfirm: '',
                    fb_id: '',
                    email: '',
    };
  }

  handleChange(input, event) {
    let change = {};
    change[input] = event.target.value;
    this.setState(change);
  }

  render() {
    return(
      <form>
        <inputField value={this.state.name} place="Full name" />
        <input
          value = { this.state.fb_id }
          placeholder = 'Facebook id'
          onChange = {this.handleChange.bind(this, 'fb_id')}/>
        <input
          value = { this.state.email }
          placeholder = 'E-mail'
          onChange = {this.handleChange.bind(this, 'email')}/>
        <input
          value = { this.state.password }
          placeholder = 'Password'
          onChange = {this.handleChange.bind(this, 'password')}/>
        <input
          value = { this.state.password }
          placeholder = 'Confirm password'
          onChange = {this.handleChange.bind(this, 'passConfirm')}/>
      </form>
    );
  }
}
