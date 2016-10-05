import React, { Component } from 'react';

let GetReviews = (props) => {
  return (
    <div>
      {
      props.data.map((eachReview, index) => {
        return (
          <div key={index} className='well'>
            <h2>{eachReview.review_id} says:</h2>
            <p>{eachReview.employerReview}</p>
          </div>
        )
      })
    }
    </div>
  )
}


export default GetReviews;
