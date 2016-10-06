import React from 'react';

const getEmployeeReviews = (props) => {
  return (
    <div>
      {
        props.data.map((eachReview, index) => {
          if (eachReview === undefined || eachReview === null) {
            return (
              <div key={index}>
                There are no current reviews right now
              </div>
            );
          }
          return (
            <div key={index} className='well'>
              <h4>{eachReview.user_id} says:</h4>
              <p>{eachReview.review}</p>
            </div>
          );
        })
      }
    </div>
  );
};


export default getEmployeeReviews;
