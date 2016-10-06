import React from 'react';

let getEmployeeReviews = (props) => {
  return (
    <div>
        {
        props.data.map((eachReview, index) => {
          if(eachReview === undefined || eachReview === null) {
            return (
              <div key={index}>
                There are no current reviews right now
              </div>
            )
          } else {
            return (
              <div key={index} className='well'>
                <h4>{eachReview.review_id} says:</h4>
                <p>{eachReview.employeeReview}</p>
              </div>
            )
          }
        })
      }
    </div>
  )
}


export default getEmployeeReviews;
