import React from 'react'

export default function Profile() {
    const token = sessionStorage.getItem('token');
    const parsedUser = JSON.parse(sessionStorage.getItem('usuario'))

  return token && parsedUser ? (
    <div>
        Usuario: {parsedUser.user}, tu pass actual es: {parsedUser.pass}
    </div>
  ) : (
    <div>
        Quien eres, canalla
    </div>
  )
}
