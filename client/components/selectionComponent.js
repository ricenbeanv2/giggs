import React from 'react';
import Select from 'react-select';

const SelectionComponent = (props) => {
  console.log('inside selectionComponent', props);
  return (
    <Select
      options={props.options} {...props.input}
      onBlur={() => props.input.onBlur(props.value)}
    />
    );
};

export default SelectionComponent;
