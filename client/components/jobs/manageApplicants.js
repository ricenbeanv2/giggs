import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Moment from 'moment';
import { getApplicants, changeStatus } from '../../actions/applicants';
import { getJobDetail } from '../../actions/jobs';
import { setReviewInfo } from '../../actions/review';
import Cookies from 'js-cookie';

class ManageApplicants extends Component {
  constructor(props) {
    super(props);
    this.updateStatus = this.updateStatus.bind(this);
    this.renderApplicants = this.renderApplicants.bind(this);
    this.redirectToReview = this.redirectToReview.bind(this);
  }

  componentWillMount() {
    this.props.getApplicants(this.props.jobs.jobId);
  }
  redirectToReview(userID) {
    const params = {
      user_id: Cookies.getJSON('user').userid,
      job_id: this.props.jobs.jobId,
      rated_user: userID,
      type: 'employer'
    };
    this.props.setReviewInfo(params);
    browserHistory.push('/createReview');
  }
  updateStatus(applicantID, status) {
    const params = {
      id: applicantID,
      job_status: status
    };
    this.props.changeStatus(params)
    .then(() => {
      this.props.getApplicants(this.props.jobs.jobId);
      browserHistory.push('/jobAdmin');
    })
    .catch(error => {
      throw error;
    });
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
            <h4 className="app-item__author">
              {applicantData.username}
            </h4>
            <p className="app-item__time">
              Applied at: {Moment(applicantData.createdAt).format('LLL')}
            </p>
            <div className="app-item__about">
              <span className={statusTextClass}>Status: {applicantData.job_status}</span>
              <span className="app-item__posts">Bid Price: ${applicantData.bid_price}</span>
              <span className="app-item__posts">
                {(() => {
                  switch (applicantData.job_status) {
                    case 'pending':
                      return (
                        <div>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => this.updateStatus(applicantData.id, 'accepted')}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => this.updateStatus(applicantData.id, 'rejected')}
                          >
                            Reject
                          </button>
                        </div>
                      );
                    case 'accepted':
                      return (
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => this.updateStatus(applicantData.id, 'completed')}
                        >
                          Mark as completed
                        </button>
                      );
                    case 'completed':
                      return (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => this.redirectToReview(applicantData.user_id)}
                        >
                          Review
                        </button>
                      );
                    default:
                      return (<p>User Rejected</p>);
                  }
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let manageSection = '';
    if (this.props.apply.applicants.length === 0) {
      manageSection = (<p>There are no applicants for the job.</p>);
    } else {
      manageSection = this.props.apply.applicants.map(this.renderApplicants);
    }
    return (
      <div>
        <h3> Manage Applicants </h3>
        <hr />
        {manageSection}
      </div>
    );
  }
}

function mapStateToProps({ apply, jobs, review }) {
  return { apply, jobs, review };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getApplicants, changeStatus, getJobDetail, setReviewInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageApplicants);
