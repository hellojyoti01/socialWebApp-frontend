import React from 'react'
import s from '../../../css/send_otp.module.css'
function SendOTP() {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h1>Send OTP</h1>
        <form>
          <div className={s.otp_input_container}>
            <input type="text" id="otpInput1" maxLength="1" className={s.otp_input} />
            <input type="text" id="otpInput2" maxLength="1" className={s.otp_input} />
            <input type="text" id="otpInput3" maxLength="1" className={s.otp_input} />
            <input type="text" id="otpInput4" maxLength="1" className={s.otp_input} />
            <input type="text" id="otpInput5" maxLength="1" className={s.otp_input} />
            <input type="text" id="otpInput6" maxLength="1" className={s.otp_input} />
          </div>
          <div className={s.button_row}>
            <button className={s.back_button}>Back</button>
            <button className={s.resend_button}>Resend</button>
            <button className={s.verify_button}>Verify</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SendOTP
