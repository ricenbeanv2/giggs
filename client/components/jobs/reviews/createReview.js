import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createReview } from '../../../actions/review';
import Cookies from 'js-cookie';


import StarReview from './starReview';

class createReviews extends Component {
  constructor(props){
    super(props)
    this.state = {
       type: '', // Tiffany will send this over.
       review_id: Cookies.getJSON('user').userid,
       job_id: 4, // Tiffany should send this over.
       employerReview: '',
       numericalEmployerReview: ''
     }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStarRate = this.handleStarRate.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.createReview(this.state);
    console.log("Line 28, Inside handleSubmit", this.state);
  }
  handleChange(event){
    event.preventDefault();
    this.setState({ employerReview : event.target.value})
  }
   handleStarRate(event){
     event.preventDefault();
     this.setState({numericalEmployerReview: event.target.value})
   }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4> Write a review! </h4>
          <p> Its always great to hear from you!</p>
          <StarReview star={this.handleStarRate}/>
          <input type="text"
            placeholder="Write a review..."
            value={this.state.employerReview}
            onChange={this.handleChange}
            ></input>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}



function mapStateToProps({ reviews, auth }) {
  return { reviews, auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createReview }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(createReviews);
