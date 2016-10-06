import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { createReview, isReviewed } from '../../../actions/review';
import Cookies from 'js-cookie';
import StarReview from './starReview';

class createReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
       review: '',
       numericalReview: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStarRate = this.handleStarRate.bind(this);
  }
  componentWillMount() {
    const params = {
      type: this.props.reviews.info.type
      review_id: Cookies.getJSON('user').userid,
      job_id: this.props.reviews.info.job_id,
    };
    this.props.isReviewed(params).then(() => {
      console.log("this.props.reviews.isReviewd", this.props.reviews.isReviewd);
    });
  }

  handleSubmit(event) {
      event.preventDefault();
      let params = {};
      if (this.state.type === 'employer') {
        params = {
          type: this.props.reviews.info.type,
          review_id: Cookies.getJSON('user').userid,
          job_id: this.props.reviews.info.job_id,
          employerReview: this.state.review,
          numericalEmployerReview: this.state.numericalReview
        };
        this.props.createReview(params);
      } else {
        params = {
          type: this.props.reviews.info.type,
          review_id: Cookies.getJSON('user').userid,
          job_id: this.props.reviews.info.job_id,
          employeeReview: this.state.review,
          numericalEmployeeReview: this.state.numericalReview
        };
        this.props.createReview(params);
      }
  }
  handleChange(event) {
      event.preventDefault();
      this.setState({ review: event.target.value });
  }
  handleStarRate(event) {
      event.preventDefault();
      this.setState({ numericalReview: event.target.value });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4> Write a review! </h4>
          <p>You are {this.props.reviews.info.type}</p>
          <p> Its always great to hear from you!</p>
          <StarReview star={this.handleStarRate} />
          <input
            type="text"
            placeholder="Write a review..."
            value={this.state.employerReview}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ reviews }) {
  return { reviews };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createReview, isReviewed }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(createReviews);
