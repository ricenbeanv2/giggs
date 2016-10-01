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
		console.log(this.props)
		if (!this.props.show) {
			return <div></div>
		}

		const InfoBoxStyle = {
			position: 'absolute',
			backgroundColor: 'white',
			zIndex: '1000',
			width: '25em',
			border: '2px solid black',
			'overflowY': 'auto'
		};

		return (
				<div style={InfoBoxStyle} className="modal-container">
					<ul>
						{
						<li>
						<strong><h1 style={{textAlign: 'center'}}><p>{this.props.job.jobName}</p></h1></strong>
						<strong>Openings</strong><p>{this.props.job.openings}</p>
						<strong>Description</strong><p>{this.props.job.description}</p>
						<strong>Payment</strong><p>{"$ " + this.props.job.max_price}</p>
						<strong>Address</strong><p>{this.props.job.address}</p>
						<strong>Deadline</strong><p>{this.props.job.deadline}</p>
						</li>
						}
					</ul>
					<button onClick={() => this.redirect(this.props.job.id)} style={{ marginBottom: '10px', marginLeft: '83%' }} >Apply</button>
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