import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { getUserApps } from '../../actions/auth.js';
import { getJobDetail } from '../../actions/jobs.js';

class UserApplications extends Component {
  constructor(props) {
    super(props);
    this.renderEachApp = this.renderEachApp.bind(this);
    this.redirectToJob = this.redirectToJob.bind(this);
  }
  componentWillMount() {
    this.props.getUserApps();
  }
  redirectToJob(jobID) {
    this.props.getJobDetail(jobID).then(() => {
      browserHistory.push('/selectedJob');
    });
  }

  renderEachApp(applicationData, key) {
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
          <button
            className="btn btn-secondary"
            onClick={() => this.redirectToJob(applicationData.job_id)}
          >
            Go to Job
          </button>
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
  return bindActionCreators({ getUserApps, getJobDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserApplications);
