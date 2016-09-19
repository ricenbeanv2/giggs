import React from 'react';

const InputBox = (props) => {
  return (
    <div>
      <input
        value = {props.value}
        placeholder = {props.place}
        onChange = {props.func.bind(this, props.input)}/>
    </div>
  );
}

export default InputBox;
