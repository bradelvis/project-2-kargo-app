import React, { useState } from 'react';
import "../App.css"; 

function CommentSection() {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add comment logic
  };

  return (
    <form onSubmit={handleSubmit} className="comment-section">
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Add a comment"
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentSection;
