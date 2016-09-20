import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <p>Giggs</p>
        {this.props.children}
      </div>
    );
  }
}
