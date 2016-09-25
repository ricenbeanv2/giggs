import React, { Component } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';

class JobMap extends Component {

	render() {
		const loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
		const mapStyle = { height: "100%", width:'100%', position:'absolute' };
		const LatLng = { lat: 34.0739, lng: -118.2400 }; //dodger stadium
		return (
			<ScriptjsLoader
				hostname={ 'maps.googleapis.com' }
				pathname={ '/maps/api/js' }
				query={{ key: '[insert api key]', libraries: 'geometry,drawing,places' }}
				loadingElement={
					<div>
						<img src={ loading } />
					</div>
				}
				containerElement={ <div style={ mapStyle } /> } 
				googleMapElement={
					<GoogleMap defaultZoom={ 10 } defaultCenter={ LatLng } >
						<Marker key={ 1 } position={ LatLng } />
					</GoogleMap>
				}
			/>	
		);
	}

}

export default JobMap;
