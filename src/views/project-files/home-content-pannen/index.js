import React, { useState, useRef, useEffect } from 'react'
import Search from 'src/components/content/searchBar'
import Story from 'src/components/content/story'
import Feed from 'src/components/content/feed'

// context
import { useAuth } from 'src/context/AuthProvider'

//api

import postService from 'src/Api/postService'
//css
import s from './homecontent.module.css'
function Index() {
  const [feedPost, setFeedPost] = useState(null)
  const [currPage, setCurrPage] = useState(1)
  const [prevPage, setPrevPage] = useState(0) // storing prev page number
  const [wasLastList, setWasLastList] = useState(false) // setting a flag to know the last list
  const listInnerRef = useRef()

  const authContext = useAuth()

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1)
      }
    }
  }
  useEffect(() => {
    if (authContext.token && currPage) {
      function fetchAllPostFeed() {
        postService.findAllPostFeed({ page: currPage }, authContext.token).then((res) => {
          if (!res.data.length) {
            setWasLastList(true)
            return
          }

          setPrevPage(currPage)
          if (feedPost) {
            setFeedPost([...feedPost, ...res.data])
          } else {
            setFeedPost(res.data)
          }
        })
      }

      if (!wasLastList && prevPage !== currPage) {
        fetchAllPostFeed()
      }
    }
  }, [currPage, wasLastList, prevPage, feedPost])

  return (
    <div className={s.home_pannel} onScroll={onScroll} ref={listInnerRef}>
      <Search />
      <Story />
      <Feed feedPost={feedPost} setFeedPost={setFeedPost} />
    </div>
  )
}

export default Index
