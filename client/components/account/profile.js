import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../actions/auth';
import { getJobList } from '../../actions/jobs';
import Cookies from 'js-cookie';


class UserProfilePage extends Component {
	constructor(props) {
		super(props);

		this.state = {};

	}

	componentDidMount() {
		this.props.getJobList()
		console.log("INSIDE PROFILE CWM JOBS", this.props.jobs)
		console.log("INSIDE PROFILE CWM AUTH", this.props.auth)//.userData.getUser(Cookies.getJSON('user').userid))
	}

	render() {
		console.log("INSIDE PROFILE RENDER JOBS", this.props.jobs)
		console.log("INSIDE PROFILE RENDER AUTH", this.props.auth)
		return (
			
			<div>HELLO WORLD</div>

		);
	}

}

function mapStateToProps({ jobs, auth }) {
	return { jobs, auth };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getUser, getJobList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
//Cookies.getJSON('user').userid;