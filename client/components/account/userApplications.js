import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserApps } from '../../actions/auth.js';

class UserApplications extends Component {
  constructor(props) {
    super(props);
    this.renderEachApp = this.renderEachApp.bind(this);
  }
  componentWillMount() {
    this.props.getUserApps();
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
          {applicationData.createdAt}
        </td>
        <td>
          Go to Job
        </td>
      </tr>
    )
  }
  render() {
    return (
      <div>
        <h4> Your Applications: </h4>
        <table className="table">
          <thead>
            <th>Job ID </th>
            <th>Bid Price </th>
            <th>Job status </th>
            <th>Applied At </th>
            <th>Action </th>
          </thead>
          {this.props.auth.userApps.map(this.renderEachApp)}
        </table>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserApps }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserApplications);
