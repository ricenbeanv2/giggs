import React from 'react';
import StarRating from 'react-star-rating';

const starReview = (props) => {
  return (
    <div>
      <StarRating name="handler" totalStars={5} onRatingClick={props.star} />
    </div>
  )
}


export default starReview;
