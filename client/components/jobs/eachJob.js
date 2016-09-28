import React from 'react';

const eachJob = (props) => {
  return (
    <div>{
<<<<<<< d609b7320de614ce3144db7a9878fd186f80142f
        props.data.map((eachJob, index) => {
          return <div key={index} className='well'>
            <h4>Job</h4>
            <p>{eachJob.jobName}</p>
            <h4>Category</h4>
            <p>{eachJob.category_id}</p>
            <h4>Location</h4>
            <p>{eachJob.address}</p>
            <h4>Description</h4>
            <p>{eachJob.description}</p>
            <h4>Openings</h4>
            <p>{eachJob.openings}</p>
            <h4>Max Price</h4>
            <p>{eachJob.max_price}</p>
            <h4>Deadline</h4>
            <p>{eachJob.deadline.toString().slice(0,15)}</p>
          </div>
        })
=======
      props.data.map((eachJob, index) => {
        return <div key={index} className='well'>
          <h4>Job</h4>
          <p>{eachJob.jobName}</p>
          <h4>Category</h4>
          <p>{eachJob.category_id}</p>
          <h4>Location</h4>
<<<<<<< 79647d7fa0e8cb96ee12b507eb502ed037bf84ab
          <p>{eachJob.location_lat}</p>
=======
          <p>{eachJob.address}</p>
>>>>>>> [feature] Converts address to lat/long after selecting an address
          <h4>Description</h4>
          <p>{eachJob.description}</p>
          <h4>Openings</h4>
          <p>{eachJob.openings}</p>
          <h4>Max Price</h4>
          <p>{eachJob.max_price}</p>
<<<<<<< 79647d7fa0e8cb96ee12b507eb502ed037bf84ab
          <h4>Deadline</h4>
          <p>{eachJob.deadline.toString()}</p>
        </div>
=======
          
          <p>{eachJob.deadline.toString()}</p>
        </div>
        })
=======
          <h4>Deadline</h4>
          <p>{eachJob.deadline.toString()}</p>
        </div>
>>>>>>> [feature] Converts address to lat/long after selecting an address
      })
>>>>>>> [feature] Converts address to lat/long after selecting an address
      }</div>
  );
};

export default eachJob;
