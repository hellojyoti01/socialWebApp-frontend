import API from './API'
import Route from './apiUrl'

const postService = {
  findAllPostSingleUser(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.findAllPostSingleUser}`, params, {
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
  createPost(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.createPost}`, params, {
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
  updatePost(params, token) {
    return new Promise((resolve, reject) => {
      API.patch(`${Route.updatePost}`, params, {
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
  deletePost(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.deletePost}`, params, {
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
  findAllPostFeed(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.findAllPostFeed}`, params, {
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
export default postService
