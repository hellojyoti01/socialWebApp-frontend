import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CRow, CFormInput, CFormLabel, CCol } from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'

import { IAmHere, sayHelloGif } from 'src/assets'
import s from './edit_profile.module.css'
import { useAuth } from 'src/context/AuthProvider'

import authService from 'src/Api/authService'
import validator from 'src/middleware/validator'
function Index() {
  const [userInputActive, setUserInputActive] = useState(true)
  const [toastActive, setToastActive] = useState(false)
  const [userInput, setUserInput] = useState({
    name: '',
    phoneNo: '',
    gender: '',
    dateOfBirth: '',
    bio: '',
    address: '',
  })

  const authContext = useAuth()
  const location = useLocation()

  const navigate = useNavigate()

  const handelEdit = (e) => {
    e.preventDefault()
    setUserInputActive(!userInputActive)
  }
  const handelCancel = (e) => {
    e.preventDefault()
    setUserInputActive(!userInputActive)
  }

  const handelBack = (e) => {
    e.preventDefault()
    navigate('/profile', { state: { id: 1, user: authContext.user } })
  }

  const handelFieldChange = (e) => {
    if (e.target.value !== 'on') {
      setUserInput((prev) => {
        return {
          ...prev,
          [e.target.id]: e.target.value,
        }
      })
    }
  }
  const handelCheckBoxChange = (e) => {
    setUserInput((prev) => {
      return {
        ...prev,
        gender: e.target.id,
      }
    })
  }

  const handelSave = async (e) => {
    e.preventDefault()

    setToastActive(true)
    try {
      //Validate Data
      const validateData = await validator.updateProfile({
        name: userInput.name,
        profile: userInput.profile,
        dateOfBirth: userInput.dateOfBirth,

        phoneNo: userInput.phoneNo.replace('+91', '').trim(),
        gender: userInput.gender,

        bio: userInput.bio,
        address: userInput.address,
      })

      // Response
      authService
        .updateProfile({ ...validateData, _id: location.state.user._id }, authContext.token)
        .then((res) => {
          console.log(res)
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
          setTimeout(() => {
            navigate('/profile', { state: { id: 1, user: authContext.user } })
          }, 1000)
        })
        .catch((e) => {
          console.log('erro0', e)
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
      console.log(e, 'validate')
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
    }
  }

  useEffect(() => {
    if (location.state?.user) {
      setUserInput((prev) => {
        return {
          ...prev,
          name: location.state.user?.name ? location.state.user.name : ``,
          phoneNo: location.state.user?.phoneNo
            ? `+91 ${location.state.user.phoneNo}`
            : `+91 000 000 000`,
          dateOfBirth: location.state.user?.dateOfBirth
            ? location.state.user.dateOfBirth
            : `0000-00-00`,
          gender: location.state.user?.gender ? location.state.user.gender : '',
          bio: location.state.user?.bio ? location.state.user.bio : ``,
          address: location.state.user?.address ? location.state.user.address : ``,
        }
      })
    }
  }, [location.state.user])

  return (
    <div className={s.container}>
      <div className={s.img_box}>
        <img src={IAmHere} className={s.i_am_here} />
      </div>
      <div className={s.edit_profile_panel}>
        <h2>
          {!userInputActive ? (
            'Edit Profile'
          ) : (
            <span className={s.sayHello}>
              <img src={sayHelloGif} alt="👋" /> Hello{' '}
              {authContext.user.name.toString().split(' ')[0]}
            </span>
          )}
        </h2>
        <form>
          <CRow className="mb-3">
            <CFormLabel htmlFor="name" className="col-lg-2 col-form-label">
              Name
            </CFormLabel>
            <CCol sm={10} className="px-5 ">
              <CFormInput
                type="text"
                id="name"
                defaultValue={userInput.name}
                plainText={userInputActive}
                onChange={(e) => handelFieldChange(e)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="phoneNumber" className="col-lg-2 col-form-label">
              Phone
            </CFormLabel>
            <CCol sm={10} className="px-5">
              <CFormInput
                type="text"
                id="phoneNo"
                value={`${userInput.phoneNo}`}
                disabled={userInputActive}
                plainText={userInputActive}
                onChange={(e) => handelFieldChange(e)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="dateOfBirth" className="col-lg-2 col-form-label">
              BirthDay
            </CFormLabel>
            <CCol sm={10} className="px-5">
              <CFormInput
                type="date"
                id="dateOfBirth"
                value={userInput.dateOfBirth}
                disabled={userInputActive}
                plainText={userInputActive}
                onChange={(e) => handelFieldChange(e)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="dateOfBirth" className="col-lg-2 col-form-label">
              Gender
            </CFormLabel>
            <CCol sm={10} className="pt-2 px-5">
              {userInput.gender || !userInputActive ? (
                <>
                  {' '}
                  <input
                    type="checkbox"
                    id="male"
                    disabled={userInputActive}
                    plainText={userInputActive}
                    onChange={(e) => handelCheckBoxChange(e)}
                  />{' '}
                  <span>Male</span>
                  <input
                    type="checkbox"
                    id="female"
                    disabled={userInputActive}
                    plainText={userInputActive}
                    onChange={(e) => handelCheckBoxChange(e)}
                  />{' '}
                  <span>Female</span>
                </>
              ) : (
                'Add Your Gender Here...'
              )}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel htmlFor="bio" className="col-lg-2 col-form-label">
              Bio
            </CFormLabel>
            <CCol sm={10} className="px-5">
              <CFormInput
                type="textarea"
                id="bio"
                placeholder="add your bio...."
                value={userInput.bio}
                disabled={userInputActive}
                plainText={userInputActive}
                onChange={(e) => handelFieldChange(e)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="address" className="col-lg-2 col-form-label">
              Address
            </CFormLabel>
            <CCol sm={10} className="px-5">
              <CFormInput
                type="textarea"
                id="address"
                placeholder="add your address...."
                value={userInput.address}
                disabled={userInputActive}
                plainText={userInputActive}
                onChange={(e) => handelFieldChange(e)}
              />
            </CCol>
          </CRow>

          <div className={s.form_group}>
            {!userInputActive ? (
              <button
                onClick={(e) => handelCancel(e)}
                style={{
                  pointerEvents: toastActive ? 'none' : 'auto',
                }}
              >
                Cancel
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <button
                onClick={(e) => handelEdit(e)}
                style={{
                  pointerEvents: toastActive ? 'none' : 'auto',
                }}
              >
                Edit
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
            {/*Button divide */}
            {!userInputActive ? (
              <button
                onClick={(e) => handelSave(e)}
                style={{
                  pointerEvents: toastActive ? 'none' : 'auto',
                }}
              >
                Save
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <button
                onClick={(e) => handelBack(e)}
                style={{
                  pointerEvents: toastActive ? 'none' : 'auto',
                }}
              >
                Back
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Index
