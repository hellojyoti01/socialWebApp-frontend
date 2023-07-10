import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//component
import Search from 'src/components/content/searchBar'
import Story from 'src/components/content/story'
import Feed from 'src/components/content/feed'

// context
import { useAuth } from 'src/context/AuthProvider'
import { fetchAllFeedPost } from 'src/redux/postSlice'
import { fetchAllSentRequests, fetchAllPendingRequests } from 'src/redux/friendSlice'
//api

//css
import s from './homecontent.module.css'
function Index() {
  //redux
  const store = useSelector((store) => store)
  const { feedPost, wasLastList } = store.postReducer

  const [currPage, setCurrPage] = useState(1)
  const [prevPage, setPrevPage] = useState(0) // storing prev page number
  // setting a flag to know the last list
  const listInnerRef = useRef()
  const dispatch = useDispatch()
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
        dispatch(fetchAllFeedPost({ page: currPage, token: authContext.token }))
        setPrevPage(currPage)
      }

      if (!wasLastList && prevPage !== currPage) {
        fetchAllPostFeed()
      }
    }
  }, [currPage, wasLastList, prevPage])
  useEffect(() => {
    if (authContext?.user && authContext?.token) {
      dispatch(fetchAllSentRequests({ token: authContext.token }))
      dispatch(
        fetchAllPendingRequests({
          token: authContext.token,
        }),
      )
    }
  }, [])
  return (
    <div className={s.home_pannel} onScroll={onScroll} ref={listInnerRef}>
      <Search />
      <Story />
      <Feed feedPost={feedPost} />
    </div>
  )
}

export default Index
