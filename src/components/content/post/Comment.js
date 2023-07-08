import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { format } from 'date-fns'

import s from './comment.module.css' // Assume you have a CSS file named Comment.css for styling

//icon
import { MdOutlineReplay } from 'react-icons/md'
import { AiOutlineHeart, AiFillHeart, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

import { avatar } from '../../../assets'

//Api
import postService from 'src/Api/postService'
import { useAuth } from 'src/context/AuthProvider'
import validator from 'src/middleware/validator'

const Comment = ({ pic, setComment, comment, onReply, onLike, onDelete }) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.comment)
  const [user, setUser] = useState(null)
  const [alreadyAddedLike, setAlreadyAddedLike] = useState(false)
  const [replayText, setReplayText] = useState('')
  const [toastActive, setToastActive] = useState(false)

  const authContext = useAuth()

  //Replay Text
  const handleReply = () => {
    setIsReplying(!isReplying)
  }
  const hendelReplaySubmit = async (e) => {
    e.preventDefault()
    try {
      //Validate Data
      const validateData = await validator.createComment({
        post_id: pic._id,
        comment: replayText,
      })

      // Response
      postService
        .addComment({ ...validateData, parentId: comment._id }, authContext.token)
        .then((res) => {
          // let commentArr = [...comment]
          // commentArr.unshift(res.data)
          // setComment([...commentArr])
          // setNeWComment('')
          console.log(res, 'replay comment')
          toast.success(res.message, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setTimeout(() => {
            setToastActive(false)
          }, 3000)
        })
        .catch((e) => {
          const { data } = e.response
          toast.warning(data.message, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setTimeout(() => {
            setToastActive(false)
          }, 3000)
        })
    } catch (e) {
      toast.error(e.message, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setTimeout(() => {
        setToastActive(false)
      }, 3000)

      setIsReplying(!isReplying)
    }
  }

  const handleLike = () => {
    onLike(comment.id) // Assuming comment has a unique id
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleDelete = () => {
    setToastActive(true)

    postService
      .deleteComment(
        {
          comment_id: comment._id,
          post_id: pic._id,
          parent_id: comment.parentCommentId ? comment.parentCommentId : null,
        },
        authContext.token,
      )
      .then((res) => {
        // Feed Filter Deleted comment

        setComment((prev) => {
          const updatedArr = prev.filter((el) => {
            return res.data._id.toString() !== el._id.toString()
          })
          return [...updatedArr]
        })
        toast.success(res.message, {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setTimeout(() => {
          setToastActive(false)
        }, 2000)
      })
      .catch((e) => {
        const { data } = e.response
        toast.warning(data.message, {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setTimeout(() => {
          setToastActive(false)
        }, 2000)
      })
  }

  const handleEditSubmit = () => {
    setToastActive(true)

    postService
      .updatedComment(
        { comment_id: comment._id, post_id: pic._id, comment: editText },
        authContext.token,
      )
      .then((res) => {
        // Feed Filter Deleted Post
        setIsEditing(false)
        setComment((prev) => {
          const updatedArr = prev.map((el) => {
            if (res.data._id.toString() === el._id.toString()) {
              el.comment = res.data.comment
            }
            return el
          })
          return [...updatedArr]
        })
        toast.success(res.message, {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setTimeout(() => {
          setToastActive(false)
        }, 2000)
      })
      .catch((e) => {
        const { data } = e.response
        toast.warning(data.message, {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setTimeout(() => {
          setToastActive(false)
        }, 2000)
      })
  }

  console.log(comment.updatedAt, 'comem')
  return (
    <>
      <ul className={s.comment_unorder_list}>
        <li>
          <div className={s.comment}>
            <div className={s.comment_content}>
              <div className={s.comment_header}>
                <span className={s.comment_profile}>
                  {' '}
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src={comment?.commentBy ? comment?.commentBy.profile : avatar}
                      alt="user"
                    />
                  </div>
                </span>
                <span className={s.comment_author}>
                  {comment?.commentBy ? comment.commentBy?.userName : ''}
                </span>
                <span className={s.date_time}>
                  {comment?.updatedAt ? (
                    <>
                      {' '}
                      {format(new Date(comment.updatedAt), 'MMM d, yyyy')}
                      {format(new Date(comment.updatedAt), 'h:mm a')}
                    </>
                  ) : (
                    ''
                  )}
                </span>
              </div>
              <div className={s.comment_text}>{comment ? comment.comment : ''}</div>
            </div>
            <div className={s.comment_actions}>
              <button onClick={handleReply}>
                <MdOutlineReplay />
              </button>

              <button onClick={handleLike}>
                {alreadyAddedLike ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
              {authContext.user?._id?.toString() === comment.commentBy._id.toString() ? (
                <button onClick={handleEdit}>
                  <AiOutlineEdit />
                </button>
              ) : (
                ''
              )}
              {authContext.user?._id.toString() === comment.commentBy._id.toString() ? (
                <button onClick={handleDelete}>
                  <AiOutlineDelete />
                </button>
              ) : (
                ''
              )}
            </div>
            {isReplying && (
              <div className={s.reply_input}>
                <input
                  type="text"
                  placeholder="Reply..."
                  value={replayText}
                  onChange={(e) => setReplayText(e.target.value)}
                />
                <button onClick={hendelReplaySubmit}>Replay</button>
              </div>
            )}
            {isEditing && (
              <div className={s.edit_input}>
                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button
                  onClick={handleEditSubmit}
                  style={{
                    pointerEvents: toastActive ? 'none' : 'auto',
                  }}
                >
                  Save
                </button>
              </div>
            )}

            {/*Show All Comment*/}
            <div className={s.show_nested_count_comment}>
              {comment?.replies?.length >= 1 ? (
                <span>Show All Replay Commnet {comment.replies.length}</span>
              ) : (
                ''
              )}
            </div>
            {/* Nested comments */}
            {/* <ul className={s.nested_comment_unorder_list}>
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
            </ul> */}
          </div>
          <ToastContainer />
        </li>
      </ul>
    </>
  )
}

export default Comment
