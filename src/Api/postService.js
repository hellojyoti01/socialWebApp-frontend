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
  likeAPost(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.likeAPost}`, params, {
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
  findAllLikeSingleUser(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.findAllLikeSinglePost}`, params, {
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
  checkCurrentUserLike(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.CheckCurrentUserLike}`, params, {
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
  findAllLikePost(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.FindAllLikePost}`, params, {
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
  getAllComment(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.getAllCommentPost}`, params, {
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
  addComment(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.addCommentInPost}`, params, {
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
  updatedComment(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.updatedComment}`, params, {
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
  deleteComment(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.deleteComment}`, params, {
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
