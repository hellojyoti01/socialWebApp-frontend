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
  getAllPendingRequest(token) {
    return new Promise((resolve, reject) => {
      API.post(
        `${Route.getAllPendingrequest}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
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
  acceptRequest(param, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.acceptRequest}`, param, {
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
  sendRequest(param, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.sendRequest}`, param, {
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

  checkRelationShipStatus(param, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.checkRelationShipStatus}`, param, {
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
