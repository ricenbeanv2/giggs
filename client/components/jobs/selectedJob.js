import Moment from 'moment';
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getJobDetail } from '../../actions/jobs';
import { setReviewInfo } from '../../actions/review';
import { queryApp } from '../../actions/applicants';

import ApplicantList from './applicantList';
import ApplyJob from './applyJob';
import ManageApplication from './manageApplication';

class SelectedJob extends Component {
  constructor(props) {
    super(props);
    this.redirectToReview = this.redirectToReview.bind(this);
  }
  componentWillMount() {
    if (Cookies.getJSON('user').userid === this.props.jobs.job.user_id) {
      browserHistory.push('/jobAdmin');
    }
  }
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
  redirectToReview(e) {
    e.preventDefault();
    const params = {
      user_id: Cookies.getJSON('user').userid,
      job_id: this.props.jobs.jobId,
      rated_user: this.props.jobs.job.user_id,
      type: 'employee'
    };
    this.props.setReviewInfo(params);
    browserHistory.push('/createReview');
  }

  render() {
    let userAdmin;
    //case 1: job canceled, show job is canceled
    if (this.props.jobs.job.status === 'canceled') {
      userAdmin = <p> This job is canceled </p>;
    } else {
    //case 2: job active
      //case 2a: user applied
      if (this.props.apply.entry) {
        //case 2a(i): status is  accepted / rejected, render current job status
        if (this.props.apply.entry.job_status === 'accepted'
        || this.props.apply.entry.job_status === 'rejected') {
          userAdmin = <p> Your current job status is: {this.props.apply.entry.job_status} </p>;
        }
        //case 2a(ii): status is completed, render Review
        if (this.props.apply.entry.job_status === 'completed') {
          userAdmin = (
            <div>
              Your current job status is: {this.props.apply.entry.job_status}
              <button
                className="btn btn-secondary"
                onClick={this.redirectToReview}
              >
                Review
              </button>
            </div>
          );
        } else {
        //case 2a(iii): status is pending, render ManageApplication
          userAdmin = <ManageApplication />;
        }
      } else {
      //case 2b: user did not apply before, render ApplyJob
        userAdmin = <ApplyJob />;
      }
    }

    return (
      <div>
        <div>
          <h4> Job Name: </h4> {this.props.jobs.job.jobName} <br />
          <h4> Username: </h4> {this.props.jobs.job.username} <br />
          <h4> Openings: </h4> {this.props.jobs.job.openings} <br />
          <h4> Address: </h4> {this.props.jobs.job.address} <br />
          <h4> Category: </h4>
          {this.props.jobs.job.category[0].toUpperCase() + this.props.jobs.job.category.slice(1)}
          <br />
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

function mapStateToProps({ jobs, apply, review }) {
  return { jobs, apply, review };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobDetail, queryApp, setReviewInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedJob);
