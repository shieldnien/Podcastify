import React from "react";

export default function Dashboard() {
  const token = sessionStorage.getItem("token");
  const parsedUser = JSON.parse(sessionStorage.getItem("usuario"));

  return token && parsedUser ? (
    <>
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Bienvenido, {parsedUser.user.toUpperCase()}</p>
      </div>
    </>
  ) : (
    <>Quien eres, canalla</>
  );
}
