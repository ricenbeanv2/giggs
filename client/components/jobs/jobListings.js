// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { DropdownButton, MenuItem, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
// import Select from 'react-select';
//
// import { getJobList, sortPriceChange, sortCategories, sortDate, filterCategory } from '../../actions/jobs';
// import EachJob from './eachJob';
//
// class JobListings extends Component {
//   componentWillMount() {
//     this.props.getJobList()
//   }
//   constructor(props){
//     super(props)
//     this.state = {
//       changes: undefined,
//       data: this.props.jobs.jobList
//     }
//     this.handleChanges = this.handleChanges.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleChanges(event){
//     event.preventDefault();
//     this.setState({changes: event.target.value})
//   }
//
//   handleSubmit(){
//     this.props.filterCategory(this.state.changes)
//   }
//
//   render() {
//     return (
//       <div>
//         <DropdownButton title="Dropdown" id="bg-vertical-dropdown-1">
//           <MenuItem eventKey="1" onClick={this.props.sortPriceChange}>Price</MenuItem>
//           <MenuItem eventKey="2" onClick={this.props.sortCategories}>Category</MenuItem>
//           <MenuItem eventKey="2" onClick={this.props.sortDate}>Recent Post</MenuItem>
//         </DropdownButton>
//         <form>
//           <input type='text' placeholder='Search category' value={this.state.changes} onChange={this.handleChanges}/>
//         </form>
//         <button onClick={this.handleSubmit}>Submit</button>
//         <EachJob data={this.props.jobs.jobList}/>
//       </div>
//     )
//   }
// }
//
// function mapStateToProps({ jobs }) {
//   return { jobs };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ getJobList, sortPriceChange, sortCategories, sortDate, filterCategory }, dispatch);
// }
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(JobListings);
