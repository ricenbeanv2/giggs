import React, { Component } from 'react';
import Moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { getJobDetail, cancelJob } from '../../actions/jobs';
import { getApplicants, rejectAll } from '../../actions/applicants';
import ManageApplicants from './manageApplicants';

class JobAdmin extends Component {
  constructor(props) {
    super(props);
    this.handleCancelJob = this.handleCancelJob.bind(this);
    this.state = {
      allPending: false
    };
  }

  componentWillMount() {
    if (Cookies.getJSON('user').userid !== this.props.jobs.job.user_id) {
      browserHistory.push('/selectedJob');
    }
    this.props.getApplicants(this.props.jobs.jobId).then(() => {
      const boo = this.props.apply.applicants
      .map(applicant => applicant.job_status)
      .every(elem => elem === 'pending' || elem === 'rejected');
      this.setState({ allPending: boo });
    });
  }

  handleCancelJob(e) {
    e.preventDefault();
    //check if any applicant are completed/ accepted, show erro message, disable cancel
    this.props.rejectAll(this.props.jobs.jobId).then(() => {
      this.props.getApplicants(this.props.jobs.jobId);
      this.props.cancelJob(this.props.jobs.jobId);
    });
  }

  render() {
    return (
      <div>
        <h3> Manage Job </h3>
        <div>
          <h4> Job Name: </h4> {this.props.jobs.job.jobName} <br />
          <h4> Username: </h4> {this.props.jobs.job.username} <br />
          <h4> Openings: </h4> {this.props.jobs.job.openings} <br />
          <h4> Address: </h4> {this.props.jobs.job.address} <br />
          <h4> Category: </h4> {this.props.jobs.job.category[0].toUpperCase() + this.props.jobs.job.category.slice(1)} <br />
          <h4> Description: </h4>{this.props.jobs.job.description} <br />
          <h4> Max Price: </h4> ${this.props.jobs.job.max_price} <br />
          <h4> Job Created: </h4>{Moment(this.props.jobs.job.createdAt).format('LLL')} <br />
          <h4> Deadline: </h4>{Moment(this.props.jobs.job.deadline).format('LLL')} <br />
          <button
            className="btn btn-secondary"
            onClick={this.handleCancelJob}
            disabled={!this.state.allPending || this.props.jobs.job.status === 'canceled'}
          >
            Cancel Job
          </button>
          {!this.state.allPending ?
            <p> You cannot cancel this job, one or more applicants are accepted. </p> : null }
          {(this.props.jobs.job.status === 'canceled') ?
            <p> This job is canceled.</p> : null }
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
  return bindActionCreators({ getJobDetail, getApplicants, rejectAll, cancelJob }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobAdmin);
