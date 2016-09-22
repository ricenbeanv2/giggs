import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select';

import SelectionComponent from './selectionComponent';
import { createJob } from '../actions/jobs';

class CreateJobForm extends Component {
  render() {
    const categories = [
      { value: 'plumbing', label: 'Plumbing' },
      { value: 'tutor', label: 'Tutor' },
      { value: 'tech', label: 'Tech' },
      { value: 'auto', label: 'Auto' },
      { value: 'cook', label: 'Cook' }
    ];
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.createJob)}>
        <h3>Create Job</h3>
        <div className="form-group">
          <label>Job Name</label>
          <Field name="jobName" component="input" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Openings</label>
          <Field name="openings" component="input" type="number" className="form-control" />
        </div>

        <div className="form-group">
          <label>Category</label>
          <Field name="category" component={SelectionComponent} options={categories} className="form-control" />
        </div>

        <div className="form-group">
          <label>Job Category</label>
          <Field name="category_id" component="input" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <Field name="description" component="input" type="textarea" className="form-control" />
        </div>

        <div className="form-group">
          <label>Max Price</label>
          <Field name="max_price" component="input" type="number" className="form-control" />
        </div>

        <div className="form-group">
          <label>Deadline Date</label>
          <Field name="deadline" component="input" type="date" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary"> Submit </button>
      </form>
    );
  }
}

CreateJobForm = reduxForm({
  form: 'CreateJobForm'
})(CreateJobForm);

export default connect(null, { createJob })(CreateJobForm);
