import API from './API'
import Route from './apiUrl'

const authService = {
  Register(params) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.register}`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  SignIn(params) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.logIn}`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  sendOTP(params) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.sendOTP}`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  verifyOTP(params) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.verifyOTP}`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  resetPassword(params) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.resetPassword}`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  WhoAmI(token) {
    return new Promise((resolve, reject) => {
      API.post(
        `${Route.WhoAmI}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      )
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default authService
