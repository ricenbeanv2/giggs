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
        Job Name: {this.state.job.jobName} <br />
        Openings: {this.state.job.openings} <br />
        Category: {this.state.category} <br />
        description: {this.state.job.description} <br />
        location_lat: {this.state.job.location_lat} <br />
        location_lng: {this.state.job.location_lng} <br />
        Max Price: ${this.state.job.max_price} <br />
        Job Created: {this.state.job.createdAt} <br />
        Deadline: {this.state.job.deadline} <br />
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
