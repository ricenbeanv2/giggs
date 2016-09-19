import React from 'react';

const InputBox = (props) => {
  return (
    <input
      value = {props.value}
      placeholder = {props.place} />
  );
}

export default InputBox;
