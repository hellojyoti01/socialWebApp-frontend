import joi from 'joi'

const validator = {
  signUp(parameter) {
    return new Promise((resolve, reject) => {
      console.log(parameter)
      const { name, email, password, profile } = parameter
      console.log(name)
      console.log(email)
      console.log(password)
      console.log(profile)

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
}

export default validator
