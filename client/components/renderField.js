import React from 'react';

const renderField = ({ input, label, type, className, placeholder, meta: { touched, error } }) => (
  <div>
    <div>
      <input {...input} type={type} className={className} placeholder={placeholder} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default renderField;
