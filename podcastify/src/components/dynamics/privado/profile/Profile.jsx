import React from 'react'

export default function Profile() {
  //const user = document.cookie.split("=")[1];
  const user = sessionStorage.getItem('user')
  const token = sessionStorage.getItem('token')

  return token && user ? (
    <div>
        Usuario: {user}
    </div>
  ) : (
    <div>
        Quien eres, canalla
    </div>
  )
}
