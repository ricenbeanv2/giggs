import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { applyJob } from '../../actions/applicants';

class ApplyJob extends Component {
  constructor(props) {
    super(props);
    this.state = { bid: '', info: { user_id: this.props.user_id, job_id: this.props.job_id } };
    this.handleApply = this.handleApply.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({ bid: e.target.value });
  }
  handleApply(e) {
    e.preventDefault();
    this.state.info.bid_price = this.state.bid;
    this.props.applyJob(this.state.info)
    .then(response => {
      console.log("response", response);
    })
    .catch(err => {
      throw err;
    });
    this.setState({ bid: '' });
  }

  render() {
    return (
      <div className="col-md-4">
        <form onSubmit={this.handleApply} className="input-group">
          <div className="input-group-addon">$</div>
          <input
            className="form-control"
            placeholder="Enter Bid Price"
            value={this.state.bid}
            type="number"
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

function mapStateToProps({ apply }) {
  return { apply };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ applyJob }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyJob);
