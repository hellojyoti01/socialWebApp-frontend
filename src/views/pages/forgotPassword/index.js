import React from 'react'
import s from '../../../css/forgot_password.module.css'
function PasswordForgot() {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h1>Change Password</h1>
        <form>
          <input type="password" id="passwordInput" placeholder="New Password" />
          <input type="password" id="confirmPasswordInput" placeholder="Confirm New Password" />
          <div className={s.button_row}>
            <button className={s.change_button}>Change Password</button>
            <button className={s.cancel_button}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordForgot
