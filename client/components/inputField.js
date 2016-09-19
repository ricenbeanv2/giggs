import React from 'react';

export default (props) => {
  return (
    <div>
    <input
      value = { props.name }
      placeholder = { props.place } />
    </div>
  );
}
