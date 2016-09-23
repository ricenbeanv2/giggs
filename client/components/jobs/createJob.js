import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import SelectionComponent from '../selectionComponent';
import { sendJob } from '../../actions/jobs';
import renderField from '../renderField';

let CreateJobForm = props => {
  const { error, handleSubmit, submitting } = props;
  const categories = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'tutor', label: 'Tutor' },
    { value: 'tech', label: 'Tech' },
    { value: 'auto', label: 'Auto' },
    { value: 'cook', label: 'Cook' }
];
  return (
    <form onSubmit={handleSubmit(props.sendJob)}>
      <h3>Create Job</h3>
      <div className="form-group">
        <label>Job Name</label>
        <Field name="jobName" component={renderField} type="text" className="form-control" />
      </div>

      <div className="form-group">
        <label>Openings</label>
        <Field name="openings" component={renderField} type="number" className="form-control" />
      </div>

      <div className="form-group">
        <label>Category</label>
        <Field name="category_id" component={SelectionComponent} options={categories} />
      </div>

      <div className="form-group">
        <label>Description</label>
        <Field name="description" component={renderField} type="textarea" className="form-control" />
      </div>

      <div className="form-group">
        <label>Max Price</label>
        <Field name="max_price" component={renderField} type="number" className="form-control" />
      </div>

      <div className="form-group">
        <label>Deadline Date</label>
        <Field name="deadline" component={renderField} type="date" className="form-control" />
      </div>
      <button type="submit" disabled={submitting} className="btn btn-primary"> Submit </button>
      <div>
        {error && <strong>{error}</strong>}
      </div>
    </form>
  );
};


CreateJobForm = reduxForm({
  form: 'CreateJobForm'
})(CreateJobForm);

export default connect(null, { sendJob })(CreateJobForm);
