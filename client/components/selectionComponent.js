import React from 'react';
import Select from 'react-select';

const SelectionComponent = (props) => {
  console.log('props in select', props);
  return (
    <Select
      {...props.input}
      options={props.options}
      // onBlur={() => props.input.onBlur(props.input.value)}
      onBlur={() => {
        console.log('blur triggered');
        props.input.onBlur(props.input.value);
      }}
    />
    );
};

export default SelectionComponent;
