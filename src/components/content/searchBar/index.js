//3rd Party
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

//css
import s from './search.module.css'

//icon
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'

//local

import { useAuth } from 'src/context/AuthProvider'
import validator from 'src/middleware/validator'
import authService from 'src/Api/authService'

// react-pintura
import { PinturaEditorModal } from '@pqina/react-pintura'

// pintura
import '@pqina/pintura/pintura.css'
import {
  // editor
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
} from '@pqina/pintura'

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate)

const editorDefaults = {
  utils: ['crop', 'finetune', 'filter', 'annotate'],
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
    ...plugin_finetune_locale_en_gb,
    ...plugin_filter_locale_en_gb,
    ...plugin_annotate_locale_en_gb,
    ...markup_editor_locale_en_gb,
  },
}

function Search() {
  //Media Upload
  const [visibleEditor, setVisibleEditor] = useState(false)
  const [inputFile, setInputFile] = useState('')
  // const [fileTransformed, setFileTransFormed] = useState(0)
  const [toastActive, setToastActive] = useState(false)
  const [searchBoxReadOnly, setsearchBoxReadOnly] = useState(false)
  const [modelOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [searchData, setSearchData] = useState([])
  //context Api
  const authContext = useAuth()
  const navigate = useNavigate()

  //Upload Post In Firebase/ multer

  //Create Post In Database
  // async function cretePost() {
  //   postService
  //     .createPost({ post: userProfileUrl }, authContext.token)
  //     .then((res) => {
  //       postContext.findAllPostSingleUser(authContext.user._id, authContext.token)
  //       toast.success(res.message, {
  //         position: 'bottom-center',
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: 'light',
  //       })
  //       setTimeout(() => {
  //         setToastActive(false)
  //       }, 3000)
  //     })
  //     .catch((e) => {
  //       console.log('Error In Profile fun', e)
  //     })
  // }

  // search
  const handelSearch = async () => {
    setsearchBoxReadOnly(true)

    try {
      //Validate Data
      const validateData = await validator.findUser({
        name,
      })

      // Response
      authService
        .findUser(validateData, authContext.token)
        .then((res) => {
          if (res.data.length) {
            setSearchData([...res.data])
            setModalOpen(true)
            setsearchBoxReadOnly(false)
          }
          setsearchBoxReadOnly(false)
        })
        .catch((e) => {
          setsearchBoxReadOnly(false)
        })
    } catch (e) {
      setsearchBoxReadOnly(false)
    }
  }

  const handelNavigateProfile = async (e, el) => {
    navigate('/profile', { state: { id: 1, user: el } })
  }

  return (
    <div className={s.container}>
      {/* -----loading screen when upload File---------- */}
      {toastActive ? (
        <div div className={s.spinner}>
          <div className={s.loader}></div>
        </div>
      ) : (
        <></>
      )}

      {/* ---Search Box Wrapper Start----- */}
      <div className={s.searchBox}>
        <input
          className={s.searchInput}
          type="text"
          name=""
          value={name}
          placeholder="Search ....."
          readOnly={searchBoxReadOnly}
          onChange={(e) => setName(e.target.value)}
        />
        <button className={s.searchButton} onClick={handelSearch}>
          <i className={s.material_icons}>
            <CiSearch />
          </i>
        </button>
      </div>
      {modelOpen ? (
        <div className={s.modelOpen}>
          {searchData.map((el, idx) => {
            return (
              <ul key={idx}>
                <li onClick={(e) => handelNavigateProfile(e, el)}>{el.name}</li>
              </ul>
            )
          })}
        </div>
      ) : (
        <></>
      )}

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
            onChange={(e) => {
              setInputFile(e.target.files[0])
              setVisibleEditor(true)
            }}
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
        {visibleEditor && (
          <PinturaEditorModal
            {...editorDefaults}
            src={inputFile}
            onLoad={(res) => console.log('')}
            onHide={() => setVisibleEditor(false)}
            onProcess={({ dest }) =>
              navigate('/create-post', {
                state: {
                  id: 1,
                  url: dest,
                },
              })
            }
          />
        )}
      </div>

      {/* ---Create Post  Wrapper End----- */}
      <ToastContainer />
    </div>
  )
}

export default Search
