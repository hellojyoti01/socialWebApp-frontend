import React, { useRef, useState } from 'react'
import { wave, bg, avtar } from '../../../assets'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineMail, AiOutlineUserAdd } from 'react-icons/ai'
//@ts-ignore
import s from '../../../css/sign_up.module.css'
import { Link } from 'react-router-dom'
// import { useAuth } from "../../context/Auth.provider";
// import { useToast } from "@chakra-ui/react";
// import joi from "joi";
function Index() {
  const nameRef = useRef('')
  const passwordRef = useRef('')
  const emailref = useRef('')
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
      <img src={wave} alt="wave" className={s.wave} />
      <img src={bg} alt="bg" className={s.bg} />
      <div className={s.from_box}>
        <img src={avtar} alt="avtar" className={s.avtar} />
        <h1 className={s.sign_up_heading}>Create Account</h1>
        <div className={s.input_box}>
          <input
            type="text"
            name="username"
            className={s.input}
            required
            onChange={(e) => (nameRef.current = e.target.value)}
          />
          <label htmlFor="username" className={s.label}>
            Name
          </label>
          <span className={s.icon}>
            <AiOutlineUserAdd />
          </span>
        </div>
        <div className={s.input_box}>
          <input
            type="email"
            name="email"
            className={s.input}
            required
            onChange={(e) => (emailref.current = e.target.value)}
          />
          <label htmlFor="email" className={s.label}>
            Email
          </label>
          <span className={s.icon}>
            <AiOutlineMail />
          </span>
        </div>
        <div className={s.input_box}>
          <input
            type="password"
            name="password"
            className={s.input}
            required
            onChange={(e) => (passwordRef.current = e.target.value)}
          />
          <label htmlFor="password" className={s.label}>
            Password
          </label>
          <span className={s.icon}>
            <RiLockPasswordLine />
          </span>
        </div>
        <div className={s.btn_box}>
          <span>
            {' '}
            <input type="checkbox" />
            <p>Remember me</p>
          </span>

          <a>Forgot Password</a>
        </div>
        <div className={s.btn}>
          <button
            className={s.button}
            style={{
              verticalAlign: 'middle',
            }}
          >
            <span>Sign Up</span>
          </button>
        </div>
        <div className={s.acc_exist}>
          <Link to={'/logIn'} style={{ textDecoration: 'none', color: 'black' }}>
            <p>Already Account exist ? </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Index
