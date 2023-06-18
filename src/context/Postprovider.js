//3rd part
import React, { useState, createContext, useContext } from 'react'
import postService from 'src/Api/postService'

//context create
const postContext = createContext(null)

function Provider({ children }) {
  const [post, setPost] = useState([])
  //find All Post of a single User........
  async function findAllPostSingleUser(posted_by, token) {
    postService
      .findAllPostSingleUser({ posted_by: posted_by }, token)
      .then((res) => {
        if (res.data.length > 0) {
          setPost([...res.data])
        }
      })
      .catch((e) => {
        console.log('Error In Profile fun', e)
      })
  }
  const value = { findAllPostSingleUser, post }
  return (
    <>
      <postContext.Provider value={value}>{children}</postContext.Provider>
    </>
  )
}

const usePost = () => {
  const post = useContext(postContext)
  return post
}
export { usePost }
export default Provider
