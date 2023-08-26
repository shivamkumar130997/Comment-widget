import React, { useState } from 'react';
import CommentList from './CommentList';

function Comment({ comment, onEdit, onDelete, onLike, onAddReply, parentId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [reply, setReply] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onEdit(comment.id, editedText);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  const handleLike = () => {
    onLike(comment.id);
  };

  const handleAddReply = () => {
    if (reply.trim() !== '') {
      onAddReply(comment.id, reply, parentId); // Pass the parent ID to the function
      setReply('');
      setIsReplying(false);
    }
  };

  return (
    <div className="comment">
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={e => setEditedText(e.target.value)}
        />
      ) : (
        <div className="comment-text">{comment.text}</div>
      )}
      <div className="comment-actions">
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleLike}>Like ({comment.likes})</button>
            <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
          </>
        )}
      </div>
      {isReplying && (
        <div className="reply-box" style={{ marginLeft: '20px' }}>
          <textarea
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={handleAddReply}>Submit Reply</button>
        </div>
      )}
      <CommentList
  comments={comment.replies}
  onEdit={onEdit}
  onDelete={onDelete}
  onLike={onLike}
  onAddReply={onAddReply}
  parentId={comment.id} // Set the parent ID to the current reply's ID
/>
    </div>
  );
}

export default Comment;
