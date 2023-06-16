import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CRow, CFormInput, CFormLabel, CCol } from '@coreui/react'
import { IAmHere, sayHelloGif } from 'src/assets'
import s from './edit_profile.module.css'
import { useAuth } from 'src/context/AuthProvider'
function Index() {
  const [userInputActive, setUserInputActive] = useState(true)
  const [userInput, setUserInput] = useState({
    name: '',
    phoneNo: '',
    dateOfBirth: '',
    bio: '',
    address: '',
  })
  const authContext = useAuth()
  const location = useLocation()
  console.log(location)
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
  useEffect(() => {
    if (location.state?.user) {
      setUserInput((prev) => {
        return {
          ...prev,
          name: location.state.user?.name ? location.state.user.name : ``,
          phoneNo: location.state.user?.phoneNo ? location.state.user.phoneNo : `+91 000 000 000`,
          dateOfBirth: location.state.user?.dateOfBirth
            ? location.state.user.dateOfBirth
            : `0000-00-00`,
          bio: location.state.user?.bio ? location.state.user.bio : ``,
          address: location.state.user?.address ? location.state.user.address : ``,
        }
      })
    }
  }, [])
  return (
    <div className={s.container}>
      {/* <img src={IAmHere} className={s.i_am_here} /> */}
      <div className={s.edit_profile_panel}>
        <h2>{!userInputActive ? 'Edit Profile' : ` Hello `}</h2>
        <form>
          <CRow className="mb-3">
            <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="text"
                id="name"
                defaultValue={userInput.name}
                plainText={userInputActive}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="phoneNumber" className="col-sm-2 col-form-label">
              Phone Number
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="text"
                id="phoneNumber"
                value={userInput.phoneNo}
                disabled={userInputActive}
                plainText={userInputActive}
              />
            </CCol>
          </CRow>

          {/* <div className={s.form_group}>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" disabled={userInputActive} value={userInput.dateOfBirth} />
          </div>
          <div className={s.form_group}>h</div>
          <div className={s.form_group}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              placeholder="Tell us about yourself"
              disabled={userInputActive}
              value={userInput.bio}
            ></textarea>
          </div>
          <div className={s.form_group}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              placeholder="Enter your address"
              disabled={userInputActive}
              value={userInput.address}
            ></textarea>
          </div> */}
          {/* <div className={s.form_group}>
            <label for="location">Location</label>
            <input type="text" id="location" placeholder="Enter your location" />
          </div> */}
          <div className={s.form_group}>
            {!userInputActive ? (
              <button onClick={(e) => handelCancel(e)}>
                Cancel
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <button onClick={(e) => handelEdit(e)}>
                Edit
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
            {/*Button divide */}
            {!userInputActive ? (
              <button>
                Save
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <button onClick={(e) => handelBack(e)}>
                Back
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Index
