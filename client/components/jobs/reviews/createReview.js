import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createReview } from '../../../actions/review';

class createReviews extends Component {
  constructor(props){
    super(props)
    this.state = {
      testing: ' '
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.createReview(this.state.testing)
  }
  handleChange(event){
    this.setState({testing : event.target.value})
  }
  render() {
    return(
      <div>
      <div>
          <div className="stars">
          <input type="radio" name="star" className="star-1" id="star-1" />
          <label className="star-1" htmlFor="star-1">1</label>
          <input type="radio" name="star" className="star-2" id="star-2" />
          <label className="star-2" htmlFor="star-2">2</label>
          <input type="radio" name="star" className="star-3" id="star-3" />
          <label className="star-3" htmlFor="star-3">3</label>
          <input type="radio" name="star" className="star-4" id="star-4" />
          <label className="star-4" htmlFor="star-4">4</label>
          <input type="radio" name="star" className="star-5" id="star-5" />
          <label className="star-5" htmlFor="star-5">5</label>
          <span></span>
        </div></div>
        <form onSubmit={this.handleSubmit}>
          <input type="text"
            placeholder="Write a review..."
            value={this.state.testing}
            onChange={this.handleChange}
            ></input>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}



function mapStateToProps({ reviews }) {
  return { reviews };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createReview }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(createReviews);
