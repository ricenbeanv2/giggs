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
		this.props.getUser(Cookies.getJSON('user').userid);
		this.props.getJobList();
	}

	render() {
		const user = this.props.auth.userData;
		console.log("===========>", user)
		const userid = Cookies.getJSON('user').userid;
		if (!this.props.jobs.jobList || !this.props.auth.userData) {
			return <div>loading</div>
		}

		return (
			//<pre><code>{JSON.stringify(this.props.jobs.jobList, null, 4)}</code></pre>
			<div>
				<h3>User Info</h3>
				<ul>
					{
						Object.keys(user).map((info, i) => {
							return (
								<li key={i}>
									<pre>{user[info]}</pre>
								</li>
							)
						})
					}
				</ul>
				<h3>User Jobs</h3>
				<ul>
					{
						this.props.jobs.jobList.filter(job => job.user_id == userid).map(job => {
							return (
								<li key={job.id}>
									<pre><code>{JSON.stringify(job, null, 4)}</code></pre>
								</li>
							)
						})
					}
				</ul>
			</div>
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
