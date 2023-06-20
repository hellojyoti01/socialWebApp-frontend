import API from './API'
import Route from './apiUrl'

const conversationService = {
  //Get Conversation Of Current user
  getConversation(params, token) {
    return new Promise((resolve, reject) => {
      API.post(`${Route.getConversation}`, params, {
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

export default conversationService
