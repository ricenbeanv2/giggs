import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';

import { getJobList } from '../actions/jobs';
import EachJob from './eachJob'
import InputBox from './inputBox'

class JobListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobName:'testing',
      openings: 'testing',
      max_price: 'testing',
      location: 'testing',
      deadline: 'testing',
      description: 'testing'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(props) {
    console.log("This is working inside of JobListings Components");
  }

  render() {
    return (
      <div>
        <button onClick={this.handleChange}>Testing</button>
        <EachJob job={this.state}/>
      </div>
    )
  }
}

export default JobListings;
