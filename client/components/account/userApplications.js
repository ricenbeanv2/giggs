import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Cookies from 'js-cookie';

import { getUserApps } from '../../actions/auth.js';
import { getJobDetail } from '../../actions/jobs.js';
import { setReviewInfo } from '../../actions/review.js';

class UserApplications extends Component {
  constructor(props) {
    super(props);
    this.renderEachApp = this.renderEachApp.bind(this);
    this.redirectToJob = this.redirectToJob.bind(this);
    this.redirectToReview = this.redirectToReview.bind(this);
  }
  componentWillMount() {
    this.props.getUserApps();
  }
  redirectToJob(jobID) {
    this.props.getJobDetail(jobID).then(() => {
      browserHistory.push('/selectedJob');
    });
  }
  redirectToReview(jobID) {
    const params = {
      user_id: Cookies.getJSON('user').userid,
      job_id: jobID,
      type: 'employee'
    };
    this.props.setReviewInfo(params);
    // browserHistory.push('/createReview');
  }
  renderEachApp(applicationData, key) {
    let actionButton = '';
    if (applicationData.job_status === 'completed') {
      actionButton =
      (
        <button
          className="btn btn-secondary"
          onClick={() => this.redirectToReview(applicationData.job_id)}
        >
          Review
        </button>
      );
    } else {
      actionButton =
        (
          <button
            className="btn btn-secondary"
            onClick={() => this.redirectToJob(applicationData.job_id)}
          >
            Go to Job
          </button>
        );
    }
    return (
      <tr key={key}>
        <td>
          {applicationData.job_id}
        </td>
        <td>
          {applicationData.bid_price}
        </td>
        <td>
          {applicationData.job_status}
        </td>
        <td>
          {Moment(applicationData.createdAt).format('LLL')}
        </td>
        <td>
          {actionButton}
        </td>
      </tr>
    );
  }
  render() {
    return (
      <div>
        <h4> Your Applications: </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Job ID </th>
              <th>Bid Price </th>
              <th>Job status </th>
              <th>Applied At </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {this.props.auth.userApps.map(this.renderEachApp)}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserApps, getJobDetail, setReviewInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserApplications);
