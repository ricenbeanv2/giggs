import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Cookies } from 'js-cookie';
import { browserHistory } from 'react-router';
import { setReviewInfo } from '../../actions/review';

class ReviewButton extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     type: '',
  //     job_id: this.props.jobs.job.id,
  //     user_id: Cookies.getJSON('user').userid
  //   };
  // }

  // handleRedirect(){
  //   // if (window.location.pathname === '/jobadmin'){
  //   //   this.setState({ type: 'employer' });
  //   // } else {
  //   //   this.setState({ type: 'employee' });
  //   // }
  //   const info = {
  //     type: this.state.type,
  //     user_id: this.state.user_id,
  //     job_id: this.state.job_id,
  //   };
  //   this.props.setReviewInfo(info).then(() => {
  //     browserHistory.push('/createReview');
  //   });
  // }
  //
  // //if reviewed - see reviewe
  // //if not reviewed create review

  render() {
    return (
      <div>
        <button className="btn btn-secondary">
          Review
        </button>
      </div>
    );
  }
}

export default ReviewButton;

// function mapStateToProps({ jobs }) {
//   return { jobs };
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ setReviewInfo }, dispatch);
// }
// export default connect(mapStateToProps, )(ReviewButton);
