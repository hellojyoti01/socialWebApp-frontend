import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

/* -------------------------- App LayOut With Auth -------------------------- */

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

/* ---------------------------- Page Without Auth --------------------------- */
const Login = React.lazy(() => import('./views/pages/login'))
const Register = React.lazy(() => import('./views/pages/register'))
const VerifyOtp = React.lazy(() => import('./views/pages/verifyOtp'))
const SendOtp = React.lazy(() => import('./views/pages/sendOtp'))
const ResetPassword = React.lazy(() => import('./views/pages/resetpassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  return (
    <Suspense fallback={loading}>
      <Routes>
        {/* -------------Log In Route--------------------------------- */}
        <Route exact path="/login" name="Login Page" element={<Login />} />
        {/* -------------Register Route--------------------------------- */}
        <Route exact path="/register" name="Register Page" element={<Register />} />

        {/* -------------Reset Password Route --------------------------------- */}
        {/* -------------Send Otp : step :- 1 --------------------------------- */}
        <Route exact path="/sendOTP" name="send Otp Page" element={<SendOtp />} />
        {/* -------------Verify Otp : step :- 2 --------------------------------- */}
        <Route exact path="/verifyOTP" name="Verify Otp Page" element={<VerifyOtp />} />
        {/* -------------resetPassword : step :- 3 --------------------------------- */}
        <Route exact path="/resetPassword" name="Reset Password Page" element={<ResetPassword />} />

        {/* -------------Error Handel Route --------------------------------- */}

        {/* -------------Route not Found --------------------------------- */}
        <Route exact path="/404" name="Page 404" element={<Page404 />} />

        {/* -------------Server not Found --------------------------------- */}
        <Route exact path="/500" name="Page 500" element={<Page500 />} />

        {/* -------------Home Route --------------------------------- */}
        <Route path="*" name="Home" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  )
}
export default App
