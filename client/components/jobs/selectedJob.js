import Moment from 'moment';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJobDetail } from '../../actions/jobs';

import ApplicantList from './applicantList';
import ApplyJob from './applyJob';

class SelectedJob extends Component {

  componentWillMount() {
    this.props.getJobDetail(this.props.jobs.jobId);
  }

  render() {
    return (
      <div>
        <div>
          <h4> Job Name: </h4> {this.props.jobs.job.jobName} <br />
          <h4> Username: </h4> {this.props.jobs.job.username} <br />
          <h4> Openings: </h4> {this.props.jobs.job.openings} <br />
          <h4> Address: </h4> {this.props.jobs.job.address} <br />
          <h4> Category: </h4> {this.props.jobs.job.category} <br />
          <h4> Description: </h4>{this.props.jobs.job.description} <br />
          <h4> Max Price: </h4> ${this.props.jobs.job.max_price} <br />
          <h4> Job Created: </h4>{Moment(this.props.jobs.job.createdAt).format('LLL')} <br />
          <h4> Deadline: </h4>{Moment(this.props.jobs.job.deadline).format('LLL')} <br />
        </div>
        <ApplicantList />
        <ApplyJob />
      </div>
    );
  }
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedJob);
