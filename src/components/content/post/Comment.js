import React, { useState } from 'react'
import s from './comment.module.css' // Assume you have a CSS file named Comment.css for styling

const Comment = ({ comment, onReply, onLike, onEdit, onDelete }) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.text)

  const handleReply = () => {
    setIsReplying(!isReplying)
  }

  const handleLike = () => {
    onLike(comment.id) // Assuming comment has a unique id
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleDelete = () => {
    onDelete(comment.id) // Assuming comment has a unique id
  }

  const handleEditSubmit = () => {
    onEdit(comment.id, editText) // Assuming comment has a unique id
    setIsEditing(false)
  }

  return (
    <>
      <ul>
        <li>
          <div className={s.comment}>
            <div className={s.comment_content}>
              <span className={s.comment_author}>Author</span>
              <span className={s.comment_text}>Hello This IS a parent comment</span>
            </div>
            <div className={s.comment_actions}>
              <button onClick={handleReply}>Reply</button>
              <button onClick={handleLike}>Like</button>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
            {isReplying && (
              <div className={s.reply_input}>
                <input type="text" placeholder="Reply..." />
              </div>
            )}
            {isEditing && (
              <div className={s.edit_input}>
                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={handleEditSubmit}>Save</button>
              </div>
            )}
            {/* Nested comments */}
            <ul>
              <li>
                {' '}
                {comment.replies && (
                  <div className={s.nested_comments}>
                    {comment.replies.map((reply) => (
                      <Comment
                        key={reply.id} // Assuming reply also has a unique id
                        comment={reply}
                        onReply={onReply}
                        onLike={onLike}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </>
  )
}

export default Comment
