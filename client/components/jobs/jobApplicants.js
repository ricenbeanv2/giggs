import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getApplicants } from '../../actions/applicants';
import Moment from 'moment';

class JobApplicants extends Component {

  componentWillMount() {
    this.props.getApplicants(5)
    .then(() => {
      console.log("this.props", this.props);
    })
    .catch(error => {
      console.log("this.props", this.props);
      throw error;
    });
  }

  renderApplicants(applicantData) {
    return (
      <div key={applicantData.user_id}>
        <h4>
          user: {applicantData.user_id}
        </h4>
        <h4>
          bid_price: {applicantData.bid_price}
        </h4>
        <h4>
          applied at: {applicantData.bid_price}
        </h4>
      </div>
    );
  }

  render() {
    return (
      <div className="col-md-4">
        Job Applicants:
        {this.props.apply.applicants.map(this.renderApplicants)}
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
