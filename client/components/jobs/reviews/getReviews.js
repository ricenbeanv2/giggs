import React from 'react';

const getEmployeeReviews = (props) => {
  return (
    <div className='getReviewDiv'>
      {
        props.data.map((eachReview, index) => {
          if (eachReview === undefined || eachReview === null) {
            return (
              <div key={index} className='noReviewDiv'>
                There are no current reviews right now
              </div>
            );
          }
          return (
            <div key={index} className='eachReviewDiv'>
              <h4 className='reviewHeader'>{eachReview.username} says:</h4>
              <p className='reviewParagraph'>{eachReview.review}</p>
            </div>
          );
        })
      }
    </div>
  );
};


export default getEmployeeReviews;
