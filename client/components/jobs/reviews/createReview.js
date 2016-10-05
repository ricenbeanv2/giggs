import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createReview } from '../../../actions/review';
import Cookies from 'js-cookie';
import StarReview from './starReview';

class createReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
       type: this.props.reviews.info.type,
       review_id: Cookies.getJSON('user').userid,
       job_id: this.props.reviews.info.job_id,
       employerReview: '',
       numericalEmployerReview: 5
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStarRate = this.handleStarRate.bind(this);
  }

componentWillMount() {
    console.log("this.props.reviews", this.props.reviews);
}
handleSubmit(event) {
    event.preventDefault();
    console.log("before submitting review", this.state);
    this.props.createReview(this.state);
}
handleChange(event) {
    event.preventDefault();
    this.setState({ employerReview: event.target.value });
}
handleStarRate(event) {
    event.preventDefault();
    this.setState({ numericalEmployerReview: event.target.value });
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
  return bindActionCreators({ createReview }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(createReviews);
