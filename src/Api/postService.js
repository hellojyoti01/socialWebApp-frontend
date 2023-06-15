import API from './API'
import Route from './apiUrl'

const postService = {
  totalPost(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.findAllPost}`, params, {
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
