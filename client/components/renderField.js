import React from 'react';

const renderField = ({ input, label, type, className, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} type={type} className={className} />
    {touched && error && <span>{error}</span>}
  </div>
);

export default renderField;
