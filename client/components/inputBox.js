import React from 'react';

const InputBox = (props) => {
  return (
    <div>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.place}
        onChange={props.func.bind(this, props.input)}
        className="form-control"
      />
    </div>
  );
};

export default InputBox;
