import React, {Component} from 'react';
import { browserHistory } from 'react-router';

class completedReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    browserHistory.push('/profile')
  }
  render(){
    return(
      <div>
        <center>
          <h3>You already have submitted a review!</h3>
          <p>Click here to go to your profile page!</p>
          <button onClick={this.handleClick}>Click</button>
        </center>
      </div>
    )
  }
}


export default completedReview; 
