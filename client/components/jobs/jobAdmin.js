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
      const isAllPending = this.props.apply.applicants
      .map(applicant => applicant.job_status)
      .every(elem => elem === 'pending' || elem === 'rejected');
      this.setState({ allPending: isAllPending });
    });
  }

  handleCancelJob(e) {
    e.preventDefault();
    //check if any applicant are completed/ accepted, show error message, disable cancel
    this.props.rejectAll(this.props.jobs.jobId).then(() => {
      this.props.getApplicants(this.props.jobs.jobId);
      this.props.cancelJob(this.props.jobs.jobId);
    });
  }

  render() {
    let errorMessage = '';
    if (!this.state.allPending) {
      errorMessage = <p> You cannot cancel this job, one or more applicants are accepted. </p>;
    }
    if (this.props.jobs.job.status === 'canceled') {
      errorMessage = <p> This job is canceled.</p>;
    }
    return (
      <div>
        <div className="container center">
          <h3> Manage Job </h3>
          <hr />
          <div>
            <p> Job Name:  {this.props.jobs.job.jobName} </p>
            <p> Openings:  {this.props.jobs.job.openings} </p>
            <p> Address:  {this.props.jobs.job.address} </p>
            <p> Category:  {this.props.jobs.job.category[0].toUpperCase() + this.props.jobs.job.category.slice(1)} </p>
            <p> Description: {this.props.jobs.job.description} </p>
            <p> Max Price:  ${this.props.jobs.job.max_price} </p>
            <p> Job Created: {Moment(this.props.jobs.job.createdAt).format('LLL')} </p>
            <p> Deadline: {Moment(this.props.jobs.job.deadline).format('LLL')} </p>
            <button
              className="btn btn-secondary btn-danger"
              onClick={this.handleCancelJob}
              disabled={!this.state.allPending || this.props.jobs.job.status === 'canceled'}
            >
              Cancel Job
            </button>
            {errorMessage}
          </div>
          <ManageApplicants />
        </div>
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
