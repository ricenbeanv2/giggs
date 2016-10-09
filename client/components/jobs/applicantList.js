import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import { getApplicants } from '../../actions/applicants';

class ApplicantList extends Component {

  componentWillMount() {
    this.props.getApplicants(this.props.jobs.jobId);
  }

  renderApplicants(applicantData, key) {
    const statusTextClass = `job-status__${applicantData.job_status}`;
    const backgroundColor = `app-item__head app-item__head-${applicantData.job_status}`;
    return (
      <div className="applicant-list">
        <div key={key} className="app-item">
          <div className={backgroundColor}>
            <div className="app-item__photo">
              <img src="../../styles/assets/userIcon.png" alt="" />
            </div>
            <h4 className="app-item__author">{applicantData.username}</h4>
            <p className="app-item__time">
              Applied at: {Moment(applicantData.createdAt).format('LLL')}
            </p>
            <div className="app-item__about">
              <span className={statusTextClass}>Status: {applicantData.job_status}</span>
              <span className="app-item__posts">Bid Price: ${applicantData.bid_price}</span>
            </div>
          </div>
        </div>
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
        <h3>Job Applicants</h3>
        <hr />
        {applicantList}
      </div>
    );
  }
}

function mapStateToProps({ apply, jobs }) {
  return { apply, jobs };
}

export default connect(mapStateToProps, { getApplicants })(ApplicantList);
