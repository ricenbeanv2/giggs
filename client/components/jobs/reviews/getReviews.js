import React from 'react';

let GetReviews = (props) => {
  console.log('Line 4 inside GetReviews Component: ', props.data)
  return (
    <div>
        {
        props.data.map((eachReview, index) => {
          if(eachReview === undefined) {
            return (
              <div key={index}>
                There are no current reviews right now
              </div>
            )
          } else {
            return (
              <div key={index} className='well'>
               <h3>{eachReview.review_id} says:</h3>
               <p>eachReview.employerReview</p>
              </div>
            )
          }
        })
      }
    </div>
  )
}


export default GetReviews;
