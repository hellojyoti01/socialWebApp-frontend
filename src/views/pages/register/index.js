import React, { useState } from 'react'
import { wave, bg, avatar } from '../../../assets'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineMail, AiOutlineUserAdd } from 'react-icons/ai'
import s from '../../../css/sign_up.module.css'
import { Link } from 'react-router-dom'
import { BsFacebook } from 'react-icons/bs'
import { AiFillGoogleCircle, AiFillLinkedin } from 'react-icons/ai'

function Index() {
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [userProfileUrl, setUserProfileUrl] = useState('')
  const [error, setError] = useState({
    message: '',
  })
  // const toast = useToast();
  // const auth = useAuth();
  //@ts-ignore
  // const { signUp } = auth;

  //Joi Schema For Validation
  // const schema = joi.object({
  // 	name: joi.string().alphanum().min(4).max(10).required(),
  // 	email: joi
  // 		.string()
  // 		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  // 		.required(),
  // 	password: joi.string().min(6).max(15).required(),
  // });

  //Sign UP
  // const handelSignUp = async () => {
  // 	let name = nameRef.current;
  // 	let email = emailref.current;
  // 	let password = passwordRef.current + "";
  // 	try {
  // 		const value = await schema.validateAsync({ name, email, password });

  // 		//If Value Call DataBase
  // 		if (value) {
  // 			const error = await signUp(value.name, value.email, value.password);
  // 			if (error) {
  // 				setError({ message: error });
  // 			}
  // 		}
  // 	} catch (e) {
  // 		//Setup Error scham
  // 		setError({ message: e.message });
  // 	}
  // };

  //Debounceing Implement
  // function debounce(func, timeout = 3000) {
  // 	let timer;
  // 	return () => {
  // 		clearTimeout(timer);
  // 		timer = setTimeout(() => {
  // 			func();
  // 		}, timeout);
  // 	};
  // }

  //Change Regular executing process
  // const processChange = debounce(() => handelSignUp());

  // useEffect(() => {
  // 	//If error Toast
  // 	if (error?.message) {
  // 		toast({
  // 			title: error?.message,
  // 			status: "error",
  // 			isClosable: true,
  // 			duration: 1000,
  // 		});
  // 		setError({
  // 			message: "",
  // 		});
  // 	}
  // }, [error]);

  return (
    <div className={s.container}>
      {/* -------------Left Wave Image ---------------------- */}
      <img src={wave} alt="wave" className={s.wave} />
      {/* -------------Middle Background Image ---------------------- */}
      <img src={bg} alt="bg" className={s.bg} />

      {/* -------------Form Box Start---------------------- */}
      <div className={s.from_box}>
        {/* -------------User Profile Start---------------------- */}
        <span className={s.user_profile}>
          <input type="file" className={s.user_input_image} />
          <img src={userProfileUrl ? userProfileUrl : avatar} alt="avatar" className={s.avatar} />
        </span>
        {/* -------------User Profile End ---------------------- */}

        {/* -------------Sign Up Heading Start---------------------- */}
        <h1 className={s.sign_up_heading}>Create Account</h1>
        {/* -------------Sign Up Heading End---------------------- */}

        {/* -------------Sign Up Input Box Start---------------------- */}
        <div className={s.input_box}>
          <input type="text" name="username" className={s.input} required />
          <label htmlFor="username" className={s.label}>
            Name
          </label>
          <span className={s.icon}>
            <AiOutlineUserAdd />
          </span>
        </div>
        <div className={s.input_box}>
          <input type="email" name="email" className={s.input} required />
          <label htmlFor="email" className={s.label}>
            Email
          </label>
          <span className={s.icon}>
            <AiOutlineMail />
          </span>
        </div>
        <div className={s.input_box}>
          <input type="password" name="password" className={s.input} required />
          <label htmlFor="password" className={s.label}>
            Password
          </label>
          <span className={s.icon}>
            <RiLockPasswordLine />
          </span>
        </div>
        {/* -------------Sign Up Input Box End---------------------- */}

        {/* -------------Remember Me And Forget Password Start---------------------- */}
        <div className={s.remember_me}>
          <span>
            {' '}
            <input type="checkbox" />
            <span>Remember me</span>
          </span>
          <Link to="/sendOtp" style={{ textDecoration: 'none' }}>
            {' '}
            <span className={s.forget_password}> Forgot Password</span>
          </Link>
        </div>
        {/* -------------Remember Me And Forget Password End---------------------- */}

        {/* -------------Sign Up Button Start---------------------- */}
        <div className={s.sign_up_btn}>
          <button
            className={s.button}
            style={{
              verticalAlign: 'middle',
            }}
          >
            <span>Sign Up</span>
          </button>
        </div>
        {/* -------------Sign Up Button End---------------------- */}

        {/* -------------Account exist Start---------------------- */}
        <div className={s.account_exist}>
          <Link to={'/logIn'} style={{ textDecoration: 'none', color: 'black' }}>
            <p className={s.account_exist_}>Already Account exist ? </p>
          </Link>
        </div>
        {/* -------------Account exist End---------------------- */}

        {/* -------------Social Media Sign UP---------------------- */}

        <div className={s.social_media_signUP}>
          <ul className={s.icon_group}>
            <li className={s.icon_list}>
              <a href="#">
                <span>
                  <BsFacebook size={20} />
                </span>
              </a>
            </li>

            <li className={s.icon_list}>
              <a href="#">
                <span>
                  <AiFillGoogleCircle size={20} />
                </span>
              </a>
            </li>
            <li className={s.icon_list}>
              <a href="#">
                <span>
                  {' '}
                  <AiFillLinkedin size={20} />
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* -------------Social Media Sign UP End---------------------- */}
      </div>
      {/* -------------Form Box Start---------------------- */}
    </div>
  )
}

export default Index
