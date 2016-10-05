import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import SelectionComponent from '../selectionComponent';
import { sendJob, getLatLong } from '../../actions/jobs';
import { getParents, getChildren } from '../../actions/categories';
import renderField from '../renderField';
import GeoComponent from '../geoComponent';

let CreateJobForm = props => {
  let loading = '';
  props.getParents();
  props.getChildren();
  const { error, handleSubmit, submitting } = props;
  if (submitting) {
    loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
  }

  const categories = [];
  for (const parent of props.cats.parentCats) {
    categories.push({ options: [], label: parent.name[0].toUpperCase() + parent.name.slice(1) });
  }
    console.log('categories: ', categories);
    console.log('props', props);
  return (
    <form onSubmit={handleSubmit(data => props.sendJob(data, props.jobs.latLong))}>
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
        <label>Address</label>
        <Field name="address" component={GeoComponent} action={props.getLatLong} type="text" className="form-control" />
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
      <img src={loading} />
    </form>
  );
};

function mapStateToProps({ cats, jobs }) {
  return { cats, jobs };
}
CreateJobForm = reduxForm({
  form: 'CreateJobForm'
})(CreateJobForm);

export default connect(mapStateToProps, { sendJob, getLatLong, getParents, getChildren })(CreateJobForm);
