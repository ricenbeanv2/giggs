import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignIn } from '../actions/auth';

import InputBox from './inputBox';
import EachJob from './eachJob'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(input, event) {
    this.setState({ [input]: event.target.value });
  }

  loginHandler(event) {
    event.preventDefault();
    this.props.userSignIn(this.state);
  }
  render() {
    console.log('inside signin.js', this.props.auth);
    return (
      <div>
        <form onSubmit={this.loginHandler}>
          <InputBox type="text" input="username" value={this.state.username} place="Username" func={this.handleChange}/>
          <InputBox type="password" input="password" value={this.state.password} place="Password" func={this.handleChange}/>
          <button type="submit">Login</button>
        </form>
      </div>

      );
    }
}


function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userSignIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
