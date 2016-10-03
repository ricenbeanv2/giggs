import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Moment from 'moment';
import { getApplicants, changeStatus } from '../../actions/applicants';
import { getJobDetail } from '../../actions/jobs';

class ManageApplicants extends Component {
  constructor(props) {
    super(props);
    this.updateStatus = this.updateStatus.bind(this);
    this.renderApplicants = this.renderApplicants.bind(this);
  }

  componentWillMount() {
    this.props.getApplicants(this.props.jobs.jobId);
  }

  updateStatus(applicantID, status) {
    const params = {
      id: applicantID,
      job_status: status
    };
    this.props.changeStatus(params)
    .then(() => {
      this.props.getApplicants(this.props.jobs.jobId);
      //about to push
      browserHistory.push('/jobAdmin');
    })
    .catch(error => {
      throw error;
    })
    ;
  }
  renderApplicants(applicantData) {
    return (
      <div key={applicantData.id}>
        <p>
          User: {applicantData.username}
        </p>
        <p>
          Bid Price: ${applicantData.bid_price}
        </p>
        <p>
          Applied at: {Moment(applicantData.createdAt).format('LLL')}
        </p>
        <p>
          Status: {applicantData.job_status}
        </p>
        {}
        {(() => {
          switch (applicantData.job_status) {
            case 'pending':
              return (
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.updateStatus(applicantData.id, 'accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.updateStatus(applicantData.id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              );
            case 'accepted':
              return (
                <button
                  className="btn btn-secondary"
                  onClick={() => this.updateStatus(applicantData.id, 'completed')}
                >
                  Mark as completed
                </button>
              );
            case 'completed':
              return (
                <button className="btn btn-secondary">
                  Review
                </button>);
            default:
              return (<p>User Rejected</p>);
          }
        })()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h4> Manage Applicants: </h4>
        {this.props.apply.applicants.map(this.renderApplicants)}
      </div>
    );
  }
}

function mapStateToProps({ apply, jobs }) {
  return { apply, jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getApplicants, changeStatus, getJobDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageApplicants);
