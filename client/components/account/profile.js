import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StarRating from 'star-rating-react';
import Cookies from 'js-cookie';
import { getUser } from '../../actions/auth';
import { getJobList } from '../../actions/jobs';
import { getEmployeeReviews, getEmployerReviews } from '../../actions/review';
import ReviewList from '../jobs/reviews/getReviews';


class UserProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		const userid = Cookies.getJSON('user').userid;
		this.props.getUser(userid);
		this.props.getJobList();
		this.props.getEmployeeReviews(userid);
	}

	render() {
		const user = this.props.auth.userData;
		const userid = Cookies.getJSON('user').userid;
		if (!this.props.jobs.jobList || !this.props.auth.userData) {
			return <div>loading</div>
		}
		const userJobs = this.props.jobs.jobList.filter(job => job.user_id === userid);

		return (
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
				<div>
					{
						userJobs.map((job, j)=> {
							return (
								<ul key={ job.id }>
									{
									<li key={ j }>
										<pre><strong>Job : </strong> { job.jobName } </pre>
										<pre><strong>category : </strong> { job.category_id } </pre>
										<pre><strong>description : </strong> { job.description } </pre>
										<pre><strong>openings : </strong> { job.openings } </pre>
										<pre><strong>payment : </strong> { job.max_price } </pre>
										<pre><strong>address : </strong> { job.address } </pre>
										<pre><strong>deadline : </strong> { job.deadline } </pre>
										<pre><strong>Job status :  </strong> { job.status } </pre>
										<br />
									</li>
									}
								</ul>
							)
						})
					}
				</div>
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getUser, getJobList, getEmployeeReviews, getEmployerReviews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
//<pre><code>{JSON.stringify(job, null, 4)}</code></pre>
