import API from './API'
import Route from './apiUrl'

const friendService = {
  totalFriend(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.findAllFriend}`, params, {
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

export default friendService
