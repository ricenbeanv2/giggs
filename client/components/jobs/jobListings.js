import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import SimpleMap from './googleMaps'
import dummyData from './dummyData'


import { getJobList } from '../../actions/jobs';
import EachJob from './eachJob';
import InputBox from '../inputBox';

class JobListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobName: 'testing',
      openings: 'testing',
      max_price: 'testing',
      location: 'testing',
      deadline: 'testing',
      description: 'testing'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(props) {
    console.log('Checking if the dummy data is working', this.state.data)
  }


  render() {
    return (
      <div>
        <SimpleMap />
        <EachJob data={this.state.data}/>
      </div>
    )
  }
}

function mapStateToProps({ job }) {
  return { job };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobListings);
