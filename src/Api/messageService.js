import API from './API'
import Route from './apiUrl'

const messageService = {
  //Get Conversation Of Current user
  getMessage(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.getMessage}`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
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
  sendMessage(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.sendMessage}`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
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

export default messageService
