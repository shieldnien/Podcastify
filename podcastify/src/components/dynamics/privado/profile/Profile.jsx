import React from 'react'

export default function Profile() {
  const user = document.cookie.split("=")[1];

  return user ? (
    <div>
        Usuario: {user}
    </div>
  ) : (
    <div>
        Quien eres, canalla
    </div>
  )
}
