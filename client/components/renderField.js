import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }, value) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} pattern=".{6,15}" required title="Must be between 6 - 15 characters" />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default renderField;
