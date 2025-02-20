import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap backdrop-blur-sm bg-transparent p-8">
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
        <div>
          <Link
            to="/login"
            className="font-semibold text-lg text-white tracking-tight"
          >
            Entrar
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
