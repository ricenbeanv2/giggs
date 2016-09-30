import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJobList } from '../../actions/jobs';

import { ReactToastr, ToastContainer, ToastMessage } from "react-toastr";
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class InfoBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		};

		this.addAlert = this.addAlert.bind(this);
		this.clearAlert = this.clearAlert.bind(this);
		
	};

	componentDidMount() {
		this.props.getJobList();
	}

	addAlert() {
		this.refs.container.success(`hi! Now is ${new Date()}`, `///title\\\\\\`, {
			closeButton: true,
		});
	}

	clearAlert() {
		this.refs.container.clear();
	}

	render() {
		const InfoBoxStyle = {
			position: 'relative',
			backgroundColor: 'white',
			zIndex: '1000',
			width: '25em',
			height: '100vh',
			'overflow-y': 'auto'
		}

		if (!this.props.jobs.jobList) {
			return <div>loading</div>
		}

		return (

				<div style={InfoBoxStyle}>
					<ToastContainer 
						toastMessageFactory={ToastMessageFactory}
						ref="container"
						className="toast-top-right"
					/>
					<h1 style={{textAlign : 'center'}}> JOBLIST </h1>
					<ul>
					{
						this.props.jobs.jobList.map(job => {
							return (
								<li key={job.id}>
									<pre><code>{JSON.stringify(job, null, 4)}</code></pre>
								</li>
							)
						})
					}
					</ul>
				</div>
			)	
	}
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);