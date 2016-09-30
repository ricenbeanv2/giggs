import React, { Component } from 'react';
import Moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJobDetail } from '../../actions/jobs';
import { getApplicants } from '../../actions/applicants';
import ManageApplicants from './manageApplicants';

class JobAdmin extends Component {

  render() {
    return (
      <div>
        <h3> Manage Job </h3>
        <div>
          <h4> Job Name: </h4> {this.props.jobs.job.jobName} <br />
          <h4> Openings: </h4> {this.props.jobs.job.openings} <br />
          <h4> Address: </h4> {this.props.jobs.job.address} <br />
          <h4> Category: </h4> {this.props.jobs.job.category} <br />
          <h4> Description: </h4>{this.props.jobs.job.description} <br />
          <h4> Max Price: </h4> ${this.props.jobs.job.max_price} <br />
          <h4> Job Created: </h4>{Moment(this.props.jobs.job.createdAt).format('LLL')} <br />
          <h4> Deadline: </h4>{Moment(this.props.jobs.job.deadline).format('LLL')} <br />
          <button className="btn btn-secondary">
            Cancel Job
          </button>
        </div>
        <ManageApplicants />
      </div>
    );
  }
}

function mapStateToProps({ apply, jobs }) {
  return { apply, jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobDetail, getApplicants }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobAdmin);
