import React from 'react';

const starReview = (props) => {
  return (
    <div className="stars">
      <input type="radio" className="star" className="star-1" id="star-1" value='1' onClick={props.star}/>
      <label className="star-1" htmlFor="star-1">1</label>
      <input type="radio" className="star" className="star-2" id="star-2" value='2' onClick={props.star}/>
      <label className="star-2" htmlFor="star-2">2</label>
      <input type="radio" className="star" className="star-3" id="star-3" value='3' onClick={props.star}/>
      <label className="star-3" htmlFor="star-3">3</label>
      <input type="radio" className="star" className="star-4" id="star-4" value='4' onClick={props.star}/>
      <label className="star-4" htmlFor="star-4">4</label>
      <input type="radio" className="star" className="star-5" id="star-5" value='5' onClick={props.star}/>
      <label className="star-5" htmlFor="star-5">5</label>
     </div>
  )
}


export default starReview;
