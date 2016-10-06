import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../actions/auth';
import { getJobList } from '../../actions/jobs';
import { getEmployerReviews, getEmployeeReviews } from '../../actions/review';
import Cookies from 'js-cookie';
import GetReviews from '../jobs/reviews/getReviews';

class UserProfilePage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		const userid = Cookies.getJSON('user').userid;
		this.props.getUser(Cookies.getJSON('user').userid);
		this.props.getJobList();
		this.props.getEmployerReviews(userid);
		this.props.getEmployeeReviews(userid);
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
				<h3> Reviews </h3>
				<h2> Jobs Applied: </h2>
				<GetReviews data={this.props.reviews.getEmployer}/>
				<h2> Jobs Created: </h2>
				<GetReviews data={this.props.reviews.getEmployee}/>
			</div>
		);
	}

}

function mapStateToProps({ jobs, auth, reviews }) {
	return { jobs, auth, reviews };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getUser, getJobList, getEmployerReviews, getEmployeeReviews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
