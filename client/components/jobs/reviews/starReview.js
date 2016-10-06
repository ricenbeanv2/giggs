import React from 'react';
import StarRating from 'star-rating-react';

const starReview = (props) => {
  return (
    <div className="stars">
      <StarRating
        size={5}
        value={props.setStar}
        onChange={props.star}
      />
    </div>
  )
}


export default starReview;
