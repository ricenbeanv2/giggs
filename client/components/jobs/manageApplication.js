import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { cancelApp, updateBid, getApplicants } from '../../actions/applicants';

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
    });

    this.setState({ bid_price: '' });
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.cancelApp(this.state)
    .then(() => {
      this.props.getApplicants(this.props.jobs.jobId);
      //redirect them to joblisting
      //remove this component :()
    });
  }

  render() {
    return (
      <div className="col-md-4">
        <button
          className="btn btn-secondary"
          onClick={this.handleCancel}
        >
          Cancel Application
        </button>
        <br />

        <form onSubmit={this.handleBidChange} className="input-group">
          <div className="input-group-addon">$</div>
          <input
            className="form-control"
            placeholder="Update Bid Price"
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
              Update
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
  return bindActionCreators({ cancelApp, updateBid, getApplicants }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageApplication);
