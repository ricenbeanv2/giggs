import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRating from 'star-rating-react';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { getUser } from '../../actions/auth';
import { getJobList, getJobDetail } from '../../actions/jobs';
import { getEmployeeReviews, getEmployerReviews } from '../../actions/review';
import ReviewList from '../jobs/reviews/getReviews';


class UserProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		const userid = Cookies.getJSON('user').userid;
		this.props.getUser(this.props.jobs.job.user_id);
		this.props.getJobList();
		this.props.getEmployeeReviews(userid);
		this.props.getEmployerReviews(userid);
	}

	redirectToJob(jobId) {
		this.props.getJobDetail(jobId).then(() => {
			browserHistory.push('/selectedjob');
		});
	}

	render() {
		const user = this.props.auth.userData;
		if (!this.props.jobs.jobList || !this.props.auth.userData) {
			return <div>loading</div>;
		}

		return (
			<div>
				<h3>User Info</h3>
				<ul>
					{
						Object.keys(user).map((info, i) => {
							if (user[info] !== null) {
								return (
									<li key={i}>
										{info}: {user[info]}
									</li>
								);
							}
						})
					}
				</ul>
				<h3>User Jobs</h3>
				<ul>
					{
						this.props.jobs.jobList.filter(job => job.user_id === this.props.jobs.job.user_id).map(job => {
							console.log('job: ', job);
							return (
								<li key={job.id}>
									<h3 onClick={() => this.redirectToJob(job.id)}>{job.jobName}</h3>
									<div>Openings: {job.openings}</div>
									<div>Category: {job.category_id}</div>
									<div>Deadline: {job.deadline}</div>
									<div>Status: {job.status}</div>
								</li>
							);
						})
					}
				</ul>
				<h3> Reviews </h3>
				<h4> Review from employers: </h4>
				<h5> Over all ratings: </h5>
				<StarRating size={5} value={this.props.reviews.ErStarRating} />
				<ReviewList data={this.props.reviews.getEmployer} />
				<h4> Reviews from employees: </h4>
				<h5> Over all ratings: </h5>
				<StarRating size={5} value={this.props.reviews.EeStarRating} />
				<ReviewList data={this.props.reviews.getEmployee} />
			</div>
		);
	}

}

function mapStateToProps({ jobs, auth, reviews }) {
	return { jobs, auth, reviews };
}

export default connect(mapStateToProps, { getUser, getJobList, getJobDetail, getEmployeeReviews, getEmployerReviews })(UserProfilePage);
