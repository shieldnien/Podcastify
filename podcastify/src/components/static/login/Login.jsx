import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };

  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
//`${process.env.REACT_URL_API}/login`
//"http://localhost:8001/login"
    axios
      .post(`${process.env.REACT_URL_API}/login`, {
        username: user,
        password: pass,
      })
      .then(
        (res) => {
          if (res.data.token) {
            sessionStorage.setItem("user", user);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("rol", res.data.rol)
            window.location.href = "/";
          }
        },
        (err) => {
          console.error(err);
        }
      );
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-blue-500 rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Accede a tu cuenta
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="user"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Usuario
                  </label>
                  <input
                    type="user"
                    name="user"
                    id="user"
                    onChange={handleChangeUser}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Usuario..."
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChangePass}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="text-2xl w-full text-white hover:text-black hover:bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium border rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
