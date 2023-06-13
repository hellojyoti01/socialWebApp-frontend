import API from './API'
import Route from './apiUrl'

const authService = {
  Register() {
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
}

export default authService
