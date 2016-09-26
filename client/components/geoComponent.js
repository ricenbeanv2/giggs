import React from 'react';
import Geosuggest from 'react-geosuggest';

const GeoComponent = (props) => {
  console.log('props', props)
  return (
    <Geosuggest
      placeholder="Enter Address"
      type={props.type}
      className={props.className}
      onBlur={() => props.input.onBlur(props.value)}
    />
  )
};

export default GeoComponent;
