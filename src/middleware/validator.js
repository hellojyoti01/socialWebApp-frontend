import joi from 'joi'

const validator = {
  SignUp(parameter) {
    return new Promise((resolve, reject) => {
      const { name, email, password, profile } = parameter

      //Joi Schema For Validation
      const schema = joi.object({
        name: joi
          .string()
          .regex(/^[A-Za-z\s]+$/)
          .min(4)
          .max(30)
          .required(),
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        password: joi.string().min(6).max(15).required(),
        profile: joi.string().uri().required(),
      })

      schema
        .validateAsync({
          name,
          email,
          password,
          profile,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  SignIn(parameter) {
    return new Promise((resolve, reject) => {
      const { email, password } = parameter

      //Joi Schema For Validation
      const schema = joi.object({
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        password: joi.string().min(6).max(15).required(),
      })

      schema
        .validateAsync({
          email,
          password,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  socialSign(parameter) {
    return new Promise((resolve, reject) => {
      const { email, profile, name, uid } = parameter

      //Joi Schema For Validation
      const schema = joi.object({
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        name: joi
          .string()
          .regex(/^[A-Za-z\s]+$/)
          .min(4)
          .max(30)
          .required(),
        profile: joi.string().uri().required(),
        uid: joi.string().required(),
      })

      schema
        .validateAsync({
          email,
          name,
          profile,
          uid,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  Email(parameter) {
    return new Promise((resolve, reject) => {
      const { email } = parameter

      //Joi Schema For Validation
      const schema = joi.object({
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
      })

      schema
        .validateAsync({
          email,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  OTP(parameter) {
    return new Promise((resolve, reject) => {
      const { OTP, email } = parameter

      //Joi Schema For Validation
      const schema = joi.object({
        OTP: joi
          .string()
          .length(6)
          .pattern(/^[0-9]+$/)
          .required(),
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
      })

      schema
        .validateAsync({
          OTP,
          email,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  forgetPassword(parameter) {
    return new Promise((resolve, reject) => {
      const { OTP, email, password, confirmPassword } = parameter

      //Joi Schema For Validation
      const schema = joi.object({
        OTP: joi
          .string()
          .length(6)
          .pattern(/^[0-9]+$/)
          .required(),
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        password: joi.string().min(6).max(15).required(),
        confirmPassword: joi.ref('password'),
      })

      schema
        .validateAsync({
          OTP,
          email,
          password,
          confirmPassword,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  updateProfile(parameter) {
    return new Promise((resolve, reject) => {
      const { name, profile, dateOfBirth, phoneNo, gender, bio, address } = parameter

      //Joi Schema For Validation
      const schema = joi.object({
        name: joi
          .string()
          .regex(/^[A-Za-z\s]+$/)
          .min(4)
          .max(30),
        profile: joi.string().uri(),
        dateOfBirth: joi.date(),
        phoneNo: joi
          .string()
          .regex(/^[0-9]{10}$/)
          .messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
        gender: joi.string(),
        bio: joi.string().min(9).max(100),
        address: joi.string(),
      })

      schema
        .validateAsync({
          name,
          profile,
          dateOfBirth,
          phoneNo,
          gender,
          bio,
          address,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },

  updatePost(parameter) {
    return new Promise((resolve, reject) => {
      const { post_id, caption, userTag, hashTag } = parameter

      const schema = joi.object({
        post_id: joi.string().required(),
        caption: joi.string().required(),
        userTag: joi.array().items(joi.string()),
        hashTag: joi.array().items(joi.string().pattern(/#[a-zA-Z0-9]+/)),
      })

      schema
        .validateAsync({
          post_id,
          caption,
          userTag,
          hashTag,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  findUser(parameter) {
    return new Promise((resolve, reject) => {
      const { name } = parameter

      const schema = joi.object({
        name: joi
          .string()
          .regex(/^[A-Za-z\s]+$/)
          .min(5)
          .required(),
      })

      schema
        .validateAsync({
          name,
        })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
}

export default validator
