import React from 'react';

const renderField = ({ input, label, type, className, value, meta: { touched, error } }) => (
  <div>
    <div>{console.log('renderfield value', value)}</div>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type} value={value} className={className} />
    {touched && error && <span>{error}</span>}
  </div>
);

export default renderField;
