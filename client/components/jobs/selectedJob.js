import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJobDetail } from '../../actions/jobs';

class SelectedJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {}
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    console.log("in click handler");
    this.props.getJobDetail(2).then(()=> {
      console.log('this.props', this.props.jobs.job[0]);
      this.setState({ job: this.props.jobs.job[0] });
      console.log('this.state.job', this.state.job);
    });
  }

  // componentDidMount() {
  //   this.props.getJobDetail(2).then(()=> {
  //     console.log('')
  //   });
  // }

  render() {
    return (

      <div>
        <button className="btn btn-secondary" onClick={this.clickHandler}>
          Get
        </button> <br />
        Job Name: {this.state.job.jobName} <br />
        Openings: {this.state.job.openings} <br />
        category_id: {this.state.job.category_id} <br />
        description: {this.state.job.description} <br />
        location_lat: {this.state.job.location_lat} <br />
        location_lng: {this.state.job.location_lng} <br />
        max_price: {this.state.job.max_price} <br />
        createdAt: {this.state.job.createdAt} <br />
        deadline: {this.state.job.createdAt} <br />
      </div>
    );
  }
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedJob);
