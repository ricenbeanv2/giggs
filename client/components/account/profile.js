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
		const userid = Cookies.getJSON('user').userid;
		if (!this.props.jobs.jobList) {
			return <div>loading</div>
		}

		return (	
			//<pre><code>{JSON.stringify(this.props.jobs.jobList, null, 4)}</code></pre>
			<ul>
				{
					this.props.jobs.jobList.filter(job => job.user_id == userid).map(function(job){
						return (
							<li key={job.id}><pre><code>{JSON.stringify(job, null, 4)}</code></pre></li>
							)
					})
				}
			</ul>

		);
	}

}

function mapStateToProps({ jobs, auth }) {
	console.log(jobs)
	return { jobs, auth };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getUser, getJobList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
