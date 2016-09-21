import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';

import InputBox from './inputBox';
import { createJob } from '../actions/jobs';

class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobName: '',
      openings: '',
      description: '',
      max_price: '',
      deadline: '',
      deadlineTime: '',
      category: '',
      categories: [{ value: 'plumbing', label: 'Plumbing' },
                   { value: 'tutor', label: 'Tutor' },
                   { value: 'tech', label: 'Tech' },
                   { value: 'auto', label: 'Auto' },
                   { value: 'cook', label: 'Cook' }]
    };

    this.handleChange = this.handleChange.bind(this);
    this.jobSubmit = this.jobSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(input, event) {
    this.setState({ [input]: event.target.value });
  }

  handleSelect(val) {
    this.setState({ category: val });
  }

  jobSubmit(event) {
    event.preventDefault();
    this.props.createJob(this.state);
  }
  renderForm() {
    return (
      <form onSubmit={this.jobSubmit}>
        <InputBox
          type="text"
          input="name"
          value={this.state.name}
          place="Job Name"
          func={this.handleChange}
        />
        <InputBox
          type="text"
          input="openings"
          value={this.state.openings}
          place="Openings"
          func={this.handleChange}
        />
        <InputBox
          type="text"
          input="description"
          value={this.state.description}
          place="Description"
          func={this.handleChange}
        />
        <InputBox
          type="number"
          input="max_price"
          value={this.state.max_price}
          place="Price"
          func={this.handleChange}
        />
        <InputBox
          type="date"
          input="deadline"
          value={this.state.deadline}
          place="Deadline Date"
          func={this.handleChange}
        />
        <InputBox
          type="time"
          input="deadlineTime"
          value={this.state.deadlineTime}
          place="Deadline Time"
          func={this.handleChange}
        />

        <Select
          name="test"
          value={this.state.category}
          options={this.state.categories}
          onChange={this.handleSelect}
        />
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

function mapStateToProps({ job }) {
  return { job };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createJob }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);
