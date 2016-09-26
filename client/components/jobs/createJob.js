import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Geosuggest from 'react-geosuggest';

import SelectionComponent from '../selectionComponent';
import { sendJob } from '../../actions/jobs';
import renderField from '../renderField';

let CreateJobForm = props => {
  let loading = '';
  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'spa/salon', label: 'Spa/Salon' },
    { value: 'home/office', label: 'Home/Office' },
    { value: 'other', label: 'Other' }
  ];
  const { error, handleSubmit, submitting } = props;
  if (submitting) {
    console.log('inside submitting');
    loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
  }
  return (
    <form onSubmit={handleSubmit(props.sendJob)}>
      <script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBG0SybP0EKWH3Jvwki7IR5AMyO_cUeeQc"></script>
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
        <Field name="address" component={Geosuggest} type="textarea" className="form-control" />
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


CreateJobForm = reduxForm({
  form: 'CreateJobForm'
})(CreateJobForm);

export default connect(null, { sendJob })(CreateJobForm);
