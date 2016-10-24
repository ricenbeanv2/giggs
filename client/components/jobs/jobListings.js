import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import Select from 'react-select-plus';
import { sortPriceChange, sortCategories, sortDate, filterCategory, filterCats, getJobs } from '../../actions/jobs';
import { getParents, getChildren } from '../../actions/categories';
import EachJob from './eachJob';

class JobListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changes: undefined,
      data: this.props.jobs.jobList,
      options: [],
      selectedValue: '',
      filtered: false
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentWillMount() {
    if(this.props.jobs.jobList.length === 0 || !this.state.filtered)
      this.props.getJobs();
    this.props.getChildren().then(() => {
      const options = this.props.cats.childCats.map(child => {
        return { label: child.name[0].toUpperCase() + child.name.slice(1), value: child.name };
      });
      this.setState({ options });
    });
  }

  handleChanges(event) {
    event.preventDefault();
    this.setState({ changes: event.target.value });
  }

  handleSubmit() {
    this.setState({ filtered: true });
    this.props.filterCats(this.state.selectValue.value, this.props.cats.childCats);
  }

  updateValue(newValue) {
		this.setState({
			selectValue: newValue
		});
	}

  render() {
    return (
      <div className='jobListings'>
        <div className='center'>
          <form className='inputForm'>

            <Select
              options={this.state.options}
              value={this.state.selectValue}
              onChange={this.updateValue}
            />
          </form>
          <button className="btn btn-secondary" onClick={this.handleSubmit}>Submit</button>
        </div>
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

function mapStateToProps({ jobs, cats }) {
  return { jobs, cats };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sortPriceChange, sortCategories, sortDate, filterCategory, getParents, getChildren, filterCats, getJobs }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(JobListings);
