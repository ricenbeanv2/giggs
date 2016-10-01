import React, { Component } from 'react';
import { bindActionCreators, Store } from 'redux';
import { connect } from 'react-redux';
import { getJobList, onJobClick } from '../../actions/jobs';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import { GET_ALL_JOBS, GET_INFOBOX_JOB } from '../../actions/actionTypes';
import InfoBox from './infoBox';


class JobMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userIcon: './user.png',
			jobIcon: './work.png',
			lat: null,
			lng: null
		};

		this.geoSuccess = this.geoSuccess.bind(this);
		this.geoError = this.geoError.bind(this);
	};

	componentWillMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
		}
		console.log("this.props", this.props)
		//get inital job list
		this.props.getJobList();
		console.log(this.props)
		//setInterval(this.props.getJobList, 10000);
	};

	geoSuccess(position) {
		this.setState({ lng: position.coords.longitude, lat: position.coords.latitude });
	};

	geoError(error) {
		console.error(`ERROR ${error.code} : ${error.message}`);
	};

	render() {
		if (this.state.lat == null && this.state.lng == null) {
			return <div>Geolocation Not Found</div>
		}

		const loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
		const spinnerStyle = {
			marginLeft: '40%',
			marginTop: '15%'
		};
		const mapStyle = {
			height: "100%",
			width:'100%',
			position:'absolute'
		};
		console.log('props inside render:',this.props)

		return (
			<div>
			<ScriptjsLoader
				hostname={ 'maps.googleapis.com' }
				pathname={ '/maps/api/js' }
				query={{ key: 'AIzaSyAJu6SvKcz7H7fNJb-akc4PJ7BYhlbhqAw', libraries: 'geometry,drawing,places' }}
				loadingElement={
					<div>
						<img style={ spinnerStyle } src={ loading } />
					</div>
				}
				containerElement={ <div style={ mapStyle } /> }
				googleMapElement={
					<GoogleMap defaultZoom={ 15 } defaultCenter={{ lat: this.state.lat, lng:this.state.lng }} >
						<Marker key={ 'UserGeo' } position={{ lat: this.state.lat, lng:this.state.lng }} icon={ this.state.userIcon } />
						{ this.props.jobs.jobList.map((job, i) => {
							return (<Marker
									key={ job.id }
									position={{ lat: job.location_lat, lng: job.location_lng }}
									icon={ this.state.jobIcon }
									onClick={ (e) => this.props.onJobClick(job) } />
								)}) 
						}
					</GoogleMap>
				}
			/>
			<InfoBox />x
			</div>
		);
	}
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

export default connect(mapStateToProps, { getJobList, onJobClick })(JobMap);
//<pre><code>{JSON.stringify(job, null, 4)}</code></pre>