//3rd party lib
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
//icon
import { BsCameraVideo } from 'react-icons/bs'
//css
import s from './message-pannel.module.css'
//provider
import { useAuth } from 'src/context/AuthProvider'
//component
import Conversation from './conversation-pannel'
import Message from './message'
//Api
import conversationService from 'src/Api/conversationService'
import messageService from '../../../Api/messageService'
import authService from 'src/Api/authService'

function MessagePanel() {
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentChat, setCurrentChat] = useState(null)
  const [message, setMessage] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [friend, setFriend] = useState(null)
  const [toastActive, setToastActive] = useState(false)

  const divRef = useRef()
  const authContext = useAuth()

  // chat box onChange set
  const handelCurrentChat = (e, el) => {
    setCurrentChat(el)
  }

  // if new message send by user
  const handelNewMessageChange = (e) => {
    setNewMessage(e.target.value)
  }

  // when user click send button
  const handelSubmit = (e) => {
    e.preventDefault()
    setToastActive(true)

    const receiverId = currentChat.members.find((el) => el != authContext.user._id)

    authContext.socket.current.emit('send_message', {
      senderId: authContext.user._id,
      receiverId: receiverId,
      text: newMessage,
    })

    messageService
      .sendMessage(
        {
          senderId: authContext.user._id,
          conversationId: currentChat._id,
          text: newMessage,
        },
        authContext.token,
      )
      .then((res) => {
        setMessage((prev) => {
          return [...prev, res.data]
        })

        setNewMessage('')
        setToastActive(false)
      })
      .catch((e) => {
        console.log(e)
        setToastActive(false)
      })
  }

  //Add new come ing message to old message array
  //!Write Logic
  //! show arrival message in a particular profile
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessage([...message, arrivalMessage])
  }, [arrivalMessage, currentChat])

  //get all conversation
  useEffect(() => {
    if (authContext.token) {
      ;(async function () {
        conversationService
          .getConversation({ user_id: authContext.user._id }, authContext.token)
          .then((res) => {
            setConversation([...res.data])
            setLoading(false)
          })
          .catch((e) => {
            console.log(e)
            setLoading(false)
          })
      })()
    }
  }, [authContext.token])

  //when active current chat
  useEffect(() => {
    if (currentChat) {
      ;(async function () {
        messageService
          .getMessage({ conversation_id: currentChat._id }, authContext.token)
          .then((res) => {
            setMessage(res.data)
          })
          .catch((e) => {
            console.log(e)
          })
      })()

      const friendIdx = currentChat.members.find((el) => el !== authContext.user._id)

      async function getUser() {
        authService
          .findOneProfile({ _id: friendIdx }, authContext.token)
          .then((res) => {
            setFriend(res.data)
          })
          .catch((e) => {
            console.log(e)
          })
      }
      getUser()
    }
  }, [currentChat])

  useEffect(() => {
    setTimeout(() => divRef.current?.scrollIntoView({ behavior: 'smooth' }), 1000)
  }, [message])

  //socket get arrival message
  authContext.socket.current.on('getMessage', (data) => {
    setArrivalMessage({
      senderId: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    })
  })

  //! Add Type Functionality

  return (
    <div className={s.messaging_panel}>
      {/* -------------------------------- user list -------------------------------- */}
      <div className={s.chat_menu}>
        <div className={s.chat_menu_wrapper}>
          <input type="text" className={s.search_input} placeholder="Search Friends...." />
          {conversation.map((el, idx) => {
            return (
              <div key={idx} onClick={(e) => handelCurrentChat(e, el)}>
                <Conversation conversation={el} key={idx} currentUser={authContext.user} />
              </div>
            )
          })}
        </div>
      </div>
      {/* ------------------------------ chat panel----------------------------- */}
      <div className={s.chat_area}>
        <div className={s.chat_area_wrapper}>
          {/* ------------------------------ User Name Top ----------------------------- */}
          {currentChat ? (
            <>
              <div className={s.chatBoxTop}>
                {message && friend
                  ? message.map((el, idx) => {
                      return (
                        <div key={idx} ref={divRef}>
                          {el.senderId.toString() == authContext.user._id.toString() ? (
                            <Message
                              message={el}
                              own={el.senderId.toString() == authContext.user._id.toString()}
                              user={authContext.user}
                            />
                          ) : (
                            <>
                              <Message
                                message={el}
                                own={el.senderId.toString() == authContext.user._id.toString()}
                                user={friend}
                              />
                            </>
                          )}
                        </div>
                      )
                    })
                  : 'message Loading'}
              </div>
              <div className={s.chatBoxBottom}>
                <textarea
                  placeholder="Type a message..."
                  rows="1"
                  className={s.textarea}
                  value={newMessage}
                  onChange={(e) => {
                    handelNewMessageChange(e)
                  }}
                ></textarea>
                <button
                  className={s.send_btn}
                  style={{ pointerEvents: toastActive ? 'none' : 'auto' }}
                  onClick={(e) => handelSubmit(e)}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className={s.noConversationText}> Open a conversation to start a chat. </span>
          )}

          {/* ------------------------------- Message Box ------------------------------ */}
        </div>
      </div>
    </div>
  )
}

export default MessagePanel
{
  /* <div className={s.friend_name}>
              {' '}
              <div className={`${s.user}`}>
                <img
                  src="https://cdn.statusqueen.com/dpimages/thumbnail/sad%20baby%20girl-67.jpg"
                  alt="User 1 Avatar"
                  className={s.username_avatar}
                />
                <h3 className={s.username}>Mickey </h3>
              </div>
              <div className={s.video_call}>
                <san>
                  <BsCameraVideo />
                </san>
              </div>
            </div> */
}
