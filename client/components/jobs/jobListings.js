
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropdownButton, MenuItem, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';

import { getJobList, sortPriceChange, sortCategories, sortDate, filterCategory } from '../../actions/jobs';
import EachJob from './eachJob';

class JobListings extends Component {
  constructor(props){
    super(props)
    this.state = {
      changes: undefined,
      data: this.props.jobs.jobList
    }
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getJobList()
  }

  handleChanges(event){
    event.preventDefault();
    this.setState({changes: event.target.value})
  }

  handleSubmit(){
    this.props.filterCategory(this.state.changes)
  }

  render() {
    return (
      <div className='jobListings'>
        <center className='searchBar'>
          <form className='inputForm'>
            <input className='inputBar' type='text' placeholder='Search category' value={this.state.changes} onChange={this.handleChanges}/>
          </form>
          <button className="btn btn-secondary" onClick={this.handleSubmit}>Submit</button>
        </center>
        <center className='dropDownCenter'>
          <DropdownButton title="Dropdown" id="bg-vertical-dropdown-1" className='dropDownBar'>
            <MenuItem eventKey="1" onClick={this.props.sortPriceChange}>Price</MenuItem>
            <MenuItem eventKey="2" onClick={this.props.sortCategories}>Category</MenuItem>
            <MenuItem eventKey="2" onClick={this.props.sortDate}>Recent Post</MenuItem>
          </DropdownButton>
        </center>
        <EachJob data={this.props.jobs.jobList} />
      </div>
    )
  }
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobList, sortPriceChange, sortCategories, sortDate, filterCategory }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(JobListings);
