import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';

import { getJobList } from '../../actions/jobs';
import EachJob from './eachJob';

class JobListings extends Component {
  componentWillMount() {
    this.props.getJobList()
    .then((response) => {
        this.setState({data: response.data})
    })
    .catch((error) => {
      console.log("Error: ", error);
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }


  render() {
    return (
      <div>
        <EachJob data={this.state.data}/>
      </div>
    )
  }
}

function mapStateToProps({ job }) {
  return { job };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobList }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(JobListings);
