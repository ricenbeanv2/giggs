import React from 'react';
import Geosuggest from 'react-geosuggest';

const GeoComponent = (props) => {
  console.log('inside geo props', props);
  return (
    <Geosuggest
      {...props.input}
      placeholder="Enter Address"
      inputClassName={props.className}
      onBlur={() => props.input.onBlur(props.input.value)}
      onSuggestSelect={(event) => {
        props.input.onBlur(event.label);
      }}
    />
  );
};

export default GeoComponent;
