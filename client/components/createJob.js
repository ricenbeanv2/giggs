import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InputBox from './inputBox';

export default class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      openings: '',
      maxPrice: '',
      deadlineDate: '',
      deadlineTime: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(input, event) {
    this.setState({[input]: event.target.value});
  }

  jobSubmit(event) {
    event.preventDefault();
    // this.props.userSignUp(this.state);
  }
  renderForm() {
    return(
      <form onSubmit={this.userSubmit}>
        <InputBox type="text" input="name" value={this.state.name} place="Job Name" func={this.handleChange}/>
        <InputBox type="text" input="openings" value={this.state.openings} place="Openings" func={this.handleChange}/>
        <InputBox type="number" input="maxPrice" value={this.state.maxPrice} place="Password" func={this.handleChange}/>
        <InputBox type="date" input="deadlineDate" value={this.state.deadlineDate} place="Confirm Password" func={this.handleChange}/>
        <InputBox type="time" input="deadlineTime" value={this.state.deadlineTime} place="Confirm Password" func={this.handleChange}/>
        <button type="submit">Create Job</button>
      </form>
    );
  }

  render() {
    return (
      <div>
        <h3>Create Job</h3>
        {this.renderForm()}
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ userSignUp }, dispatch);
// }
//
// export default connect(null, mapDispatchToProps)(SignUp);
