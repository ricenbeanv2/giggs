import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJobList, getJobDetail } from '../../actions/jobs';
import { browserHistory } from 'react-router';

class InfoBox extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.redirect = this.redirect.bind(this);

	};

	redirect(jobId) {
		this.props.getJobDetail(jobId).then(() => {
			browserHistory.push('/selectedjob');
		});
	}

	render() {
		if (!this.props.show) {
			return <div></div>
		}

		return (
			<div>
				<div className="info">
					<h1 className="info-title"><p>{this.props.job.jobName}</p></h1>
					<p className="info-price"><span>$ </span>{this.props.job.max_price}</p>
					<ul className="info-features">
						{
						<li>
						<strong>Openings</strong><p>{this.props.job.openings}</p>
						<strong>Description</strong><p>{this.props.job.description}</p>
						<strong>Address</strong><p>{this.props.job.address}</p>
						<strong>Deadline</strong><p>{this.props.job.deadline}</p>
						</li>
						}
					</ul>
					<button onClick={() => this.redirect(this.props.job.id)} className="info-button" >Apply Now</button>
				</div>
			</div>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		job: state.map.job,
		show: state.map.show
	};
};

export default connect(mapStateToProps, { getJobDetail })(InfoBox);
//<pre><code>{JSON.stringify(job, null, 4)}</code></pre>
