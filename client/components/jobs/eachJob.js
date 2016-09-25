import React from 'react';

const eachJob = (props) => {
  return (
    <div className='well'>
      <p>Job Name</p>
      {props.job.jobName}
      <p>Opening</p>
      {props.job.openings}
      <p>Description</p>
      {props.job.description}
      <p>Max Price</p>
      {props.job.max_price}
      <p>Location</p>
      {props.job.location}
      <p>Deadline</p>
      {props.job.deadline}
    </div>
  );
};

export default eachJob;


/*var newJob = {
  jobName: req.body.username,
  openings: req.body.openings,
  description: req.body.description,
  max_price: req.body.max_price,
  location_lat: req.body.location_lat,
  location_lng: req.body.location_lng,
  deadline: req.body.deadline,
}*/

// <p>Job Name</p>
// {props.jobName}
// <p>Opening</p>
// {props.openings}
// <p>Description</p>
// {props.description}
// <p>Max Price</p>
// {props.max_price}
// <p>Location</p>
// {props.location}
// <p>Deadline</p>
// {props.deadline}
