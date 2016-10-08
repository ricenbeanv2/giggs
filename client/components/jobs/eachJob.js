import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Cookies from 'js-cookie';
import GetReviews from './reviews/getReviews';
import { getJobDetail, onJobClick } from '../../actions/jobs';

class EachJob extends Component {
  constructor(props) {
    super(props);
    this.redirectToJobPage = this.redirectToJobPage.bind(this);
  }

  redirectToJobPage(jobId, jobAdminID) {
    this.props.getJobDetail(jobId)
    .then(() => {
      if (Cookies.getJSON('user').userid === jobAdminID) {
        browserHistory.push('/jobadmin');
      } else {
        browserHistory.push('/selectedJob');
      }
    });
  }

  render() {
    return (
      <div className='eachJobDiv'>
        {
          this.props.jobs.jobList.map((eachJob, index) => {
            return (
              <div key={index} className='eachJob'>
                <div>
                  <h4>Job</h4>
                  <p>{eachJob.jobName}</p>
                  <h4>Max Price</h4>
                  <p>{eachJob.max_price}</p>
                </div>
                <div>
                  <h4>Category</h4>
                  <p>{eachJob.category_id[0].toUpperCase() + eachJob.category_id.slice(1)}</p>
                </div>
                <div>
                  <h4>Description</h4>
                  <p>{eachJob.description}</p>
                  <h4>Openings</h4>
                  <p>{eachJob.openings}</p>
                </div>
                <div>
                  <h4>Deadline</h4>
                  <p>{eachJob.deadline.toString()}</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {this.redirectToJobPage(eachJob.id, eachJob.user_id)}}
                    >
                    Go to Job >>
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

export default connect(mapStateToProps, { getJobDetail, onJobClick })(EachJob);
