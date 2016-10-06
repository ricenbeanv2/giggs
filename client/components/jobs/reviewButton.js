import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Cookies } from 'js-cookie';
import { browserHistory } from 'react-router';
import { setReviewInfo } from '../../actions/review';

class ReviewButton extends Component {

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
