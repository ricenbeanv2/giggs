import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from "react-google-maps";


const SimpleMap = (props) => {
  return (
    <section style={{height: "500px", width: "500px"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: "500px",
              width: "500px"
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={14}
            defaultCenter={{ lat: 34.0218577, lng: -118.5154401 }}
            onClick={props.onMapClick}
          >
          </GoogleMap>
        }
      />
    </section>
  );
}


export default SimpleMap;
