import React, { useEffect, useRef, useState } from 'react'
import { wave, bg, avtar } from '../../../assets'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'
//@ts-ignore
import s from '../../../css/sign_in.module.css'
import { Link } from 'react-router-dom'
// import { useAuth } from "../../context/Auth.provider";
// import { useToast } from "@chakra-ui/react";
// import joi from "joi";
function Index() {
  const passwordRef = useRef('')
  const emailref = useRef('')
  const [error, setError] = useState({
    message: '',
  })
  // const toast = useToast();
  //@ts-ignore
  // const { signIn } = useAuth();

  //Joi Schema For Validation
  // const schema = joi.object({
  // 	email: joi
  // 		.string()
  // 		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  // 		.required(),
  // 	password: joi.string().min(6).max(15).required(),
  // });

  //Sign In
  // const handelSignIn = async () => {
  // 	setError({ message: "" });
  // 	let password = passwordRef.current + "";
  // 	let email = emailref.current;

  // 	try {
  // 		const value = await schema.validateAsync({ email, password });

  // 		//If Value Call DataBase
  // 		if (value) {
  // 			const error = await signIn(value.email, value.password);
  // 			if (error) {
  // 				setError({ message: error });
  // 			}
  // 		}
  // 	} catch (e) {
  // 		//Setup Error scham
  // 		setError({ message: e.message });
  // 	}
  // };

  // //Debounceing Implement
  // function debounce(func, timeout = 3000) {
  // 	let timer;
  // 	return () => {
  // 		clearTimeout(timer);
  // 		timer = setTimeout(() => {
  // 			func();
  // 		}, timeout);
  // 	};
  // }

  // //Change Regular executing process
  // const processChange = debounce(() => handelSignIn());

  // useEffect(() => {
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
        <h1 className={s.sign_up_heading}>WELCOME</h1>

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
            // onClick={processChange}
          >
            <span>Sign In</span>
          </button>
        </div>
        <div className={s.acc_exist}>
          <Link to={'/sign_up'} style={{ textDecoration: 'none', color: 'black' }}>
            <p>Create New Account ? </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Index
