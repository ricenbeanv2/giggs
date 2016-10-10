import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getUserPosts } from '../../actions/auth.js';
import { getJobDetail } from '../../actions/jobs.js';

class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.renderEachPost = this.renderEachPost.bind(this);
    this.redirectToJob = this.redirectToJob.bind(this);
  }
  componentWillMount() {
    this.props.getUserPosts();
  }
  redirectToJob(jobID) {
    this.props.getJobDetail(jobID).then(() => {
      browserHistory.push('/jobAdmin');
    });
  }

  renderEachPost(postData, key) {
    return (
      <tr key={key}>
        <td>{postData.jobName}</td>
        <td>{postData.status}</td>
        <td>{Moment(postData.deadline).format('LLL')}</td>
        <td>
          <button
            className="btn btn-secondary"
            onClick={() => this.redirectToJob(postData.id)}
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
        <h3> Your Job Posts: </h3>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>Job Name </th>
              <th>Status </th>
              <th>Deadline </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {this.props.auth.userPosts.map(this.renderEachPost)}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { getUserPosts, getJobDetail })(UserPosts);
