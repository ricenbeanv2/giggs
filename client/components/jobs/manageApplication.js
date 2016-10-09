import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { cancelApp, updateBid, getApplicants, queryApp } from '../../actions/applicants';

class ManageApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: Cookies.getJSON('user').userid,
      job_id: this.props.jobs.jobId,
      bid_price: ''
    };
    this.handleBidChange = this.handleBidChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  onInputChange(e) {
    this.setState({ bid_price: e.target.value });
  }

  handleBidChange(e) {
    e.preventDefault();
    this.props.updateBid(this.state)
    .then(() => {
      this.props.getApplicants(this.props.jobs.jobId);
      this.setState({ bid_price: '' });
    });
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.cancelApp(this.state)
    .then(() => {
      this.props.getApplicants(this.props.jobs.jobId);
      this.props.queryApp({
        job_id: this.state.job_id,
        user_id: this.state.user_id
      });
      browserHistory.push('/selectedJob');
    });
  }

  render() {
    return (
      <div>
        <h3> Manage Application </h3>
        <hr />
        <form onSubmit={this.handleBidChange}>
          <div className="row">
            <div className="col-xs-6">
              <input
                className="form-control"
                placeholder="Update Bid Price"
                value={this.state.bid_price}
                type="number"
                min="1"
                max={this.props.jobs.job.max_price}
                onChange={this.onInputChange}
              />
            </div>
            <div className="col-xs-2">
              <button
                className="btn btn-important"
                type="submit"
              >
                Update
              </button>
            </div>
            <div className="col-xs-2">
              <button
                className="btn btn-secondary"
                onClick={this.handleCancel}
              >
                Cancel Application
              </button>
            </div>
          </div>
        </form>
        <br />
      </div>
    );
  }
}

function mapStateToProps({ apply, jobs }) {
  return { apply, jobs };
}

export default connect(mapStateToProps,
  { cancelApp, updateBid, getApplicants, queryApp })(ManageApplication);
