import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import { getApplicants } from '../../actions/applicants';

class ApplicantList extends Component {

  componentWillMount() {
    this.props.getApplicants(this.props.jobs.jobId);
  }

  renderApplicants(applicantData, key) {
    return (
      <div key={key}>
        <p>Username: {applicantData.username}</p>
        <p>Bid Price: ${applicantData.bid_price}</p>
        <p>Applied at: {Moment(applicantData.createdAt).format('LLL')}</p>
      </div>
    );
  }

  render() {
    let applicantList = '';
    if (this.props.apply.applicants.length === 0) {
      applicantList = <p>There are no applicants for this job.</p>;
    } else {
      applicantList = this.props.apply.applicants.map(this.renderApplicants);
    }
    return (
      <div>
        <h4>Job Applicants:</h4>
        {applicantList}
      </div>
    );
  }
}

function mapStateToProps({ apply, jobs }) {
  return { apply, jobs };
}

export default connect(mapStateToProps, { getApplicants })(ApplicantList);
