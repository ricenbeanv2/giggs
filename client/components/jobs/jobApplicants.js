import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getApplicants } from '../../actions/applicants';

class JobApplicants extends Component {
  componentDidMount() {
    this.props.getApplicants(5)
    .then(response => {
      console.log("response", response.data);
      console.log("this.props.apply", this.props.apply);
    })
    .catch(error => {
      throw error;
    }).bind(this);
  }

  render() {
    return (
      <div className="col-md-4">
        Job Applicants here:
      </div>
    );
  }


}

function mapStateToProps({ apply }) {
  return { apply };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getApplicants }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobApplicants);
