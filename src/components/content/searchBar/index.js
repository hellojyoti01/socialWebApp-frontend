//3rd Party
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
//css
import s from './search.module.css'

//icon
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'

//local
import { storage } from 'src/firebase/firebaseSdk'
import { useAuth } from 'src/context/AuthProvider'
import postService from 'src/Api/postService'
import { usePost } from 'src/context/Postprovider'

function Search() {
  const [userProfileUrl, setUserProfileUrl] = useState('')
  // const [fileTransformed, setFileTransFormed] = useState(0)
  const [toastActive, setToastActive] = useState(false)
  const [progressBarActive, setProgressBarActive] = useState(false)

  //context Api
  const authContext = useAuth()
  const postContext = usePost()

  //Upload Post In Firebase/ multer
  const handelUploadPost = (e) => {
    setToastActive(true)
    try {
      // setUserPost(e.target.files[0])
      const storageRef = ref(storage, `images/post/${e.target.files[0].name}`)
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0])

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          // console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              break
            case 'running':
              setProgressBarActive(true)
              break
          }
        },
        (error) => {
          setProgressBarActive(false)
          console.log(error, 'Error In File Upload')
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUserProfileUrl(downloadURL)
            setProgressBarActive(false)
            // console.log('File available at', downloadURL)
          })
        },
      )
    } catch (e) {
      console.log('Error In Upload File', e)
    }
  }

  //Create Post In Database
  async function cretePost() {
    postService
      .createPost({ post: userProfileUrl }, authContext.token)
      .then((res) => {
        postContext.findAllPostSingleUser(authContext.user._id, authContext.token)
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
        console.log('Error In Profile fun', e)
      })
  }
  useEffect(() => {
    if (userProfileUrl) {
      cretePost()
    }
  }, [userProfileUrl])
  return (
    <div className={s.container}>
      {/* -----loading screen when upload File---------- */}
      {progressBarActive ? (
        <div div className={s.spinner}>
          <div className={s.loader}></div>
        </div>
      ) : (
        <></>
      )}

      {/* ---Search Box Wrapper Start----- */}
      <div className={s.searchBox}>
        <input className={s.searchInput} type="text" name="" placeholder="Search ....." />
        <button className={s.searchButton} href="#">
          <i className={s.material_icons}>
            <CiSearch />
          </i>
        </button>
      </div>
      {/* ---Search Box Wrapper End----- */}

      {/* ---Create Post Wrapper Start----- */}
      <div className={s.create_post}>
        <button
          className={s.btn}
          style={{
            pointerEvents: toastActive ? 'none' : 'auto',
          }}
        >
          <input
            type="file"
            onChange={(e) => handelUploadPost(e)}
            className={s.user_input_image}
            style={{
              pointerEvents: toastActive ? 'none' : 'auto',
            }}
          />
          Create New Post
          <span>
            <AiOutlinePlusCircle size={'30px'} />
          </span>
        </button>
      </div>
      {/* ---Create Post  Wrapper End----- */}
      <ToastContainer />
    </div>
  )
}

export default Search
