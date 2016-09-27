import React, { Component } from 'react';
import { bindActionCreators, createStore } from 'redux';
import { connect } from 'react-redux';
import { getJobList } from '../../actions/jobs';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';

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
	};

	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
		}
		//get inital job list
		this.props.getJobList();
		//refesh job list
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

		return (
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
					<GoogleMap defaultZoom={ 10 } defaultCenter={{ lat: this.state.lat, lng:this.state.lng }} >
						<Marker key={ 'UserGeo' } position={{ lat: this.state.lat, lng:this.state.lng }} icon={ this.state.userIcon } />
						{ this.props.jobs.jobList.map((job) => {
							return (<Marker
									key={ job.id }
									position={{ lat: job.location_lat, lng: job.location_lng }}
									icon={ this.state.jobIcon }/>
								)})
						}
					</GoogleMap>
				}
			/>
		);
	};
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getJobList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobMap);

/*
{ this.props.jobs.map((job) => {
							return (<Marker
									key={ job.id }
									position={{ lat: job.location_lat, lng: job.location_lng }}
									icon={ this.state.jobIcon }/>
								)})
						}
*/
