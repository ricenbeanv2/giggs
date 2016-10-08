import Cleave from 'cleave.js/dist/cleave-react.min';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.us';
import React, { Component } from 'react';

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneRawValue: ''
    };
    this.onPhoneChange = this.onPhoneChange.bind(this);
  }
  onPhoneChange(event) {
    this.setState({ phoneRawValue: event.target.rawValue });
  }
  render() {
    return (
      <Cleave
        {...this.props.input}
        placeholder="Phone number"
        className={this.props.className}
        onChange={this.onPhoneChange}
        options={{ phone: true, phoneRegionCode: 'US' }}
        // onBlur={() => this.props.input.onBlur(this.props.input.value)}
      />
    );
  }
}

export default Phone;
