//3rd part
import React, { useState, createContext, useContext } from 'react'
import postService from 'src/Api/postService'

//context create
const postContext = createContext(null)

function Provider({ children }) {
  const [post, setPost] = useState([])
  //find All Post
  async function findAllPost(posted_by, token) {
    postService
      .totalPost({ posted_by: posted_by }, token)
      .then((res) => {
        if (res.data.length > 0) {
          setPost([...res.data])
        }
      })
      .catch((e) => {
        console.log('Error In Profile fun', e)
      })
  }
  const value = { findAllPost, post }
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
