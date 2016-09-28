import React from 'react';
import GetReviews from './reviews/getReviews'

let eachJob = (props) => {
  return (
    <div>
      {
      props.data.map((eachJob, index) => {
        return <div key={index} className='well'>
          <h4>Job</h4>
          <p>{eachJob.jobName}</p>
          <h4>Category</h4>
          <p>{eachJob.category_id}</p>
          <h4>Location</h4>
          <p>{eachJob.address}</p>
          <p>{eachJob.location_lat}</p>
          <h4>Description</h4>
          <p>{eachJob.description}</p>
          <h4>Openings</h4>
          <p>{eachJob.openings}</p>
          <h4>Max Price</h4>
          <p>{eachJob.max_price}</p>
          <h4>Deadline</h4>
          <p>{eachJob.deadline.toString()}</p>
          <h4>Reviews</h4>
          <GetReviews />
        </div>
        })
      }
    </div>
  );
};
