import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectedJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    };
  }

  render() {
    return (
      <div>
        Single Job Page
      </div>
    );
  }
}

export default SelectedJob;
