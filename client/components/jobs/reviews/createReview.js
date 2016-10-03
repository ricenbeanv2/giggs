import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createReview } from '../../actions/review';

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
