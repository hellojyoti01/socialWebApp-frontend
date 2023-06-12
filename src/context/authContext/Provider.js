import React, { useState, useEffect } from 'react'

function Provider() {
  const [token, setToken] = useState(() => {
    let token = localStorage.getItem('SocialWeb_Token')

    if (token) {
      axios.defaults.headers.common['Authorization'] = token
      return token
    }
  })
  return <div>Provider</div>
}

export default Provider
