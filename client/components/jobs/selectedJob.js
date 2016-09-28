import Moment from 'moment';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJobDetail, getCategoryName } from '../../actions/jobs';

class SelectedJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
      category: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.getJobDetail(5).then(() => {
      this.setState({ job: this.props.jobs.job });
      this.props.getCategoryName(1).then(() => {
        this.setState({ category: this.props.jobs.category });
      });
    });
  }

  render() {
    return (
      <div>
        <button className="btn btn-secondary" onClick={this.clickHandler}>
          Get
        </button> <br />
        <h4> Job Name: </h4> {this.state.job.jobName} <br />
        <h4> Openings: </h4> {this.state.job.openings} <br />
        <h4> Address: </h4> {this.state.job.address} <br />
        <h4> Category: </h4> {this.state.category.toUpperCase()} <br />
        <h4> Description: </h4>{this.state.job.description} <br />
        <h4> location_lat: </h4> {this.state.job.location_lat} <br />
        <h4> location_lng: </h4>{this.state.job.location_lng} <br />
        <h4> Max Price: </h4> ${this.state.job.max_price} <br />
        <h4> Job Created: </h4>{Moment(this.state.job.createdAt).format('LLL')} <br />
        <h4> Deadline: </h4>{Moment(this.state.job.deadline).format('LLL')} <br />
        <button className="bnt btn-important">Apply</button>
      </div>
    );
  }
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobDetail, getCategoryName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedJob);
