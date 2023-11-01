import React from "react";

export default function Dashboard() {
  const user = document.cookie.split("=")[1];

  return user ? (
    <>
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Bienvenido, {user.toUpperCase()}</p>
      </div>
    </>
  ) : (
    <>Quien eres, canalla</>
  );
}
