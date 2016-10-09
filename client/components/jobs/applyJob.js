import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { applyJob, getApplicants, queryApp } from '../../actions/applicants';

class ApplyJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: Cookies.getJSON('user').userid,
      job_id: this.props.jobs.jobId,
      bid_price: ''
    };
    this.handleApply = this.handleApply.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({ bid_price: e.target.value });
  }

  handleApply(e) {
    e.preventDefault();
    this.props.applyJob(this.state)
    .then(() => {
      this.props.getApplicants(this.props.jobs.jobId);
      this.props.queryApp({
        job_id: this.state.job_id,
        user_id: this.state.user_id
      });
    });
    this.setState({ bid_price: '' });
  }

  render() {
    return (
      <div>
        <h3>Apply for Job</h3>
        <hr />
        <form onSubmit={this.handleApply}>
          <div className="row">
            <div className="col-xs-6">
              <input
                className="form-control"
                placeholder="Enter Bid Price"
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
                Apply
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ apply, jobs }) {
  return { apply, jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ applyJob, getApplicants, queryApp }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyJob);
