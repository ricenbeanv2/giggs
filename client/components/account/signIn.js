import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignIn } from '../../actions/auth';

import InputBox from '../inputBox';

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
    return (
      <div>
        <form onSubmit={this.loginHandler}>
          <div className="form-group">
            <InputBox type="text" input="username" value={this.state.username} place="Username" func={this.handleChange} />
          </div>
          <div className="form-group">
            <InputBox type="password" input="password" value={this.state.password} place="Password" func={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
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
