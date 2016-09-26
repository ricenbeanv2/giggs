import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJobList } from '../../actions/jobs';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';

export default class JobMap extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			icon: './workshop.png',
			jobs: [],
			lat: null,
			lng: null
		};

		this.geoSuccess = this.geoSuccess.bind(this);
	};

	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
		}
	};

	geoSuccess(position) {
		getJobList().then(res => {
			this.setState({
				jobs: res.data,
				lng: position.coords.longitude,
				lat: position.coords.latitude
			});
		console.log(this.state)
		});

	};

	geoError(error) {
		console.error(`ERROR ${error.code} : ${error.message}`);
	};


	render() {
		const loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
		const mapStyle = { height: "100%", width:'100%', position:'absolute' };


		if (this.state.lat == null || this.state.lng == null) {
			return <div></div>
		}

		return (
			<ScriptjsLoader
				hostname={ 'maps.googleapis.com' }
				pathname={ '/maps/api/js' }
				query={{ key: 'AIzaSyAJu6SvKcz7H7fNJb-akc4PJ7BYhlbhqAw', libraries: 'geometry,drawing,places' }}
				loadingElement={
					<div>
						<img src={ loading } />
					</div>
				}
				containerElement={ <div style={ mapStyle } /> }
				googleMapElement={
					<GoogleMap defaultZoom={ 10 } defaultCenter={{ lat: this.state.lat, lng:this.state.lng }} >
						{
						this.state.jobs.map((job) => {
							return (<Marker key={ job.id } 
											position={{ lat: job.location_lat, lng: job.location_lng }}
											icon={ this.state.icon }
									/>)
							})
						}
					</GoogleMap>
				}
			/>
		);
	};
}

var ListItemWrapper = React.createClass({
  render: function() {
    return <li>{this.props.data.text}</li>;
  }
});
var MyComponent = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.results.map(function(result) {
           return <ListItemWrapper key={result.id} data={result}/>;
        })}
      </ul>
    );
  }
});

//export default connect(null, { })(JobMap);