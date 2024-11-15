import React, { useState } from 'react';

function Rating() {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="rating">
      <h4>Rate Cargo Condition:</h4>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={rating >= star ? 'active' : ''}
          onClick={() => handleRating(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default Rating;
