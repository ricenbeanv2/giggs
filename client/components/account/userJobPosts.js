import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { getUserPosts } from '../../actions/auth.js';
import { getJobDetail } from '../../actions/jobs.js';

class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.renderEachPost = this.renderEachPost.bind(this);
    this.redirectToJob = this.redirectToJob.bind(this);
  }
  componentWillMount() {
    this.props.getUserPosts().then(() => {
      console.log("this.props.auth.userPosts", this.props.auth.userPosts);
    });
  }
  redirectToJob(jobID) {
    this.props.getJobDetail(jobID).then(() => {
      browserHistory.push('/jobAdmin');
    });
  }

  renderEachPost(postData, key) {
    return (
      <tr key={key}>
        <td>
          {postData.jobName}
        </td>
        <td>
          {postData.status}
        </td>
        <td>
          {Moment(postData.createdAt).format('LLL')}
        </td>
        <td>
          {Moment(postData.deadline).format('LLL')}
        </td>
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
        <h4> Your Job Posts: </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Job Name </th>
              <th>Status </th>
              <th>Created At </th>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserPosts, getJobDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
