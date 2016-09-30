import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { applyJob, getApplicants } from '../../actions/applicants';

class ApplyJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: Cookies.getJSON('user').userid,
      job_id: this.props.jobs.job.id,
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
    //bid_price = this.state.bid
    this.props.applyJob(this.state)
    .then(() => {
      this.props.getApplicants(this.props.jobs.job.id);
    });

    this.setState({ bid_price: '' });
  }

  render() {
    return (
      <div className="col-md-4">
        <form onSubmit={this.handleApply} className="input-group">
          <div className="input-group-addon">$</div>
          <input
            className="form-control"
            placeholder="Enter Bid Price"
            value={this.state.bid_price}
            type="number"
            min="1"
            max={this.props.jobs.job.max_price}
            onChange={this.onInputChange}
          />
          <div className="input-group-addon">.00</div>
          <br />
          <span className="input-group-btn">
            <button
              className="btn btn-important"
              type="submit"
            >
              Apply
            </button>
          </span>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ apply, jobs }) {
  return { apply, jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ applyJob, getApplicants }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyJob);
