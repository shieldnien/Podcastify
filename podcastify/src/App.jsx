import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "./components/layout/header/nav/Nav";
import Home from "./components/static/home/Home";
import Podcast from "./components/dynamics/podcast/Podcast";
import Episode from "./components/dynamics/episodes/episode/Episode";
import NotFound from "./components/static/not-found/NotFound";
import Login from "./components/static/login/Login";
import Profile from "./components/dynamics/privado/profile/Profile";
import Dashboard from "./components/dynamics/privado/dashboard/Dashboard";
import Comments from "./components/dynamics/comments/Comments";
import Footer from "./components/layout/footer/Footer";
import NavPrivada from "./components/layout/header/nav/privado/NavPrivada";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const user = sessionStorage.getItem('user')
  const token = sessionStorage.getItem('token')
  const rol = sessionStorage.getItem('rol');

  useEffect(() => {
    if (!user && !token && !rol) {
      return;
    } else {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      {(!isLoggedIn ||
      (rol === 'user')) && (
        <div className="overflow-y-scroll h-screen">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Nav />}>
                <Route index element={<Home />} />
                <Route path="/podcasts/:id" element={<Podcast />} />
                <Route
                  path="/podcasts/:id/episode/:episodeid"
                  element={<Episode />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      )}
      {isLoggedIn && 
        (rol === 'su' || 
        rol === 'admin' ||
        rol === 'mod') && (
        <div className="overflow-y-scroll h-screen">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NavPrivada />}>
                <Route index element={<Home />} />
                <Route path="/podcasts/:id" element={<Podcast />} />
                <Route
                  path="/podcasts/:id/episode/:episodeid"
                  element={<Episode />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
