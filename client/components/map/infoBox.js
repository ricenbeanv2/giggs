import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJobList } from '../../actions/jobs';

import { ReactToastr, ToastContainer, ToastMessage } from "react-toastr";
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class InfoBox extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	};

	render() {
		const InfoBoxStyle = {
			position: 'absolute',
			backgroundColor: 'white',
			zIndex: '1000',
			width: '25em',
			border: '2px solid black',
			'overflowY': 'auto'
		};

		return (

				<div style={ InfoBoxStyle }>
					<ToastContainer 
						toastMessageFactory={ ToastMessageFactory }
						ref="container"
					/>
					<h1 style={{textAlign : 'center'}}> Details </h1>
					<ul>
					{
						<li>
							<strong>Job</strong><p>{this.props.job.jobName}</p>
							<strong>Openings</strong><p>{this.props.job.openings}</p>
							<strong>Description</strong><p>{this.props.job.description}</p>
							<strong>Payment</strong><p>{"$ " + this.props.job.max_price}</p>
							<strong>Address</strong><p>{this.props.job.address}</p>
							<strong>Deadline</strong><p>{this.props.job.deadline}</p>
						</li>
					}
					</ul>
					<div className="btn-container">
						<button>
							SOMETHING
						</button>
					</div>
				</div>
			)	
	}
}

const mapStateToProps = (state) => {
	console.log(state.map.job)
	return {
		job: state.map.job,
	};
};

export default connect(mapStateToProps)(InfoBox);
//<pre><code>{JSON.stringify(job, null, 4)}</code></pre>