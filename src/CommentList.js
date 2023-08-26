import React from 'react';
import Comment from './Comment';

function CommentList({ comments, onEdit, onDelete, onLike, onAddReply, parentId }) {
  return (
    <div className="comment-list">
     {comments.map(comment => (
  <Comment
    key={comment.id}
    comment={comment}
    onEdit={onEdit}
    onDelete={onDelete}
    onLike={onLike}
    onAddReply={onAddReply}
    parentId={parentId} // Pass the parent ID to nested replies
  />
))}

    </div>
  );
}

export default CommentList;
