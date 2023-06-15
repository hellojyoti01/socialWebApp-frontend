//3rd part
import React, { useState, createContext, useContext } from 'react'
import friendService from 'src/Api/friendServices'

//context create
const friendContext = createContext(null)

function Provider({ children }) {
  const [friends, setFriends] = useState([])
  const [sendRequest, setSendRequest] = useState([])
  const [suggestion, setSuggestion] = useState([])
  const [pending, setPending] = useState([])

  //find All Friend
  async function findAllFriends(token) {
    friendService
      .totalFriend({}, token)
      .then((res) => {
        if (res.data.length > 0) {
          setFriends([...res.data])
        }
      })
      .catch((e) => {
        console.log('Error In Profile fun', e)
      })
  }
  const value = { findAllFriends, friends }
  return (
    <>
      <friendContext.Provider value={value}>{children}</friendContext.Provider>
    </>
  )
}

const useFriend = () => {
  const post = useContext(friendContext)
  return post
}
export { useFriend }
export default Provider
