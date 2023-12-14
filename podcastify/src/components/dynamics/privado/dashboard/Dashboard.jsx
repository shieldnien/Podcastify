import React from "react";

export default function Dashboard() {

  const user = sessionStorage.getItem('user')
  const token = sessionStorage.getItem('token')

  return token && user ? (
    <>
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Bienvenido, {user.toUpperCase()}</p>
      </div>
    </>
  ) : (
    <>Quien eres, canalla</>
  );
}
