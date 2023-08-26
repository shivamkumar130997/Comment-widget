import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);

  const addComment = newComment => {
    setComments([...comments, { id: Date.now(), text: newComment, likes: 0, replies: [] }]);
  };

  const addReply = (commentId, newReply, parentId) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  text: newReply,
                  likes: 0,
                  replies: [],
                  parentId // Set the parent ID
                }
              ]
            }
          : comment
      )
    );
  };
  

  const editComment = (commentId, newText) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId ? { ...comment, text: newText } : comment
      )
    );
  };

  const likeComment = commentId => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const deleteComment = commentId => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId)
    );
  };

  return (
    <div className="App">
      <h1>Comment Widget</h1>
      <CommentForm onAddComment={addComment} />
      <CommentList
        comments={comments}
        onEdit={editComment}
        onDelete={deleteComment}
        onLike={likeComment}
        onAddReply={addReply}
        parentId={null} // The top-level comments have no parent ID
      />
    </div>
  );
}

export default App;
