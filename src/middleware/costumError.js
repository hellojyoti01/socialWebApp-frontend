const costumError = {
  signUp(message) {
    if (message.includes('name')) return 'Name Must Be Alphabet And Space'
    return message
  },
}

export default costumError
