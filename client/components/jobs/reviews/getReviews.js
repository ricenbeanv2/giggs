import React from 'react';

let GetReviews = (props) => {
  return (
    <div>
      {
      props.data.map((eachReview) => {
        return (
          <div key={eachReview.id} className='well'>
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
