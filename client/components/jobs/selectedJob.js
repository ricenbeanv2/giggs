import Moment from 'moment';
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJobDetail } from '../../actions/jobs';
import { queryApp } from '../../actions/applicants';

import ApplicantList from './applicantList';
import ApplyJob from './applyJob';
import ManageApplication from './manageApplication';
//if already applied for job show manageApplication

//show only pending applciants in applicant list

//check if status is still pending show ManageApplication
//if completed/accepted?

class SelectedJob extends Component {

  componentDidMount() {
    this.props.getJobDetail(this.props.jobs.jobId)
    .then(() => {
      const params = {
        job_id: this.props.jobs.jobId,
        user_id: Cookies.getJSON('user').userid
      };
      this.props.queryApp(params);
    });
  }

  render() {
    let userAdmin;
    if (this.props.apply.entry) {
      userAdmin = <ManageApplication />;
      if (this.props.apply.entry.job_status !== 'pending') {
        userAdmin = <p> Your current job status is: {this.props.apply.entry.job_status} </p>;
      }
    } else {
      userAdmin = <ApplyJob />;
    }

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
        {userAdmin}
      </div>
    );
  }
}

function mapStateToProps({ jobs, apply }) {
  return { jobs, apply };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobDetail, queryApp }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedJob);
