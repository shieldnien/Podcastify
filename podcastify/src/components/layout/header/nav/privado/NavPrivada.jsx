import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function NavPrivada() {

  const handleSubmit = (e) => {
    e.preventDefault()
    //sessionStorage.removeItem("token");
    document.cookie += ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    window.location.href = '/'
  };

  return (
    <>
      <nav>
        <div className="flex items-center justify-between flex-wrap border-b-2 border-b-blue-950 bg-blue-600 p-6">
          <div className="flex items-center flex-shrink-0 mr-6">
            <Link
              to="/"
              className="font-bold italic text-3xl text-white tracking-tight"
            >
              PodCastify
            </Link>
          </div>
          <div>
            <Link
              to="/comments"
              className="font-semibold text-lg text-white tracking-tight"
            >
              Comentarios
            </Link>
          </div>
        </div>
        <div className="fixed bottom-0 bg-gray-400 p-2 m-2 z-10">
          <ul className="text-center">
            Panel de administración
            <li>
              <Link to="/dashboard" className="underline">
                Ir a dashboard
              </Link>
            </li>
            <li>
              <Link to="/profile" className="underline">
                Ir a perfil
              </Link>
            </li>
            <li>
              <form onSubmit={handleSubmit}>
                <button className="underline">Logout</button>
              </form>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
