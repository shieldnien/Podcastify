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
import Protected from "./components/dynamics/privado/protected/Protected";

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
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Video de fondo con overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-indigo-900/60 to-fuchsia-900/60 z-10 pointer-events-none" />
      <div className="relative z-20 min-h-screen flex flex-col">
        {!isLoggedIn && (
          <div className="flex-1 flex flex-col">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Nav />}>
                  <Route index element={<Home />} />
                  <Route path="/podcasts/:id" element={<Podcast />} />
                  <Route path="/podcasts/:id/episode/:episodeid" element={<Episode />} />
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
        {isLoggedIn && (rol === 'su' || rol === 'admin' || rol === 'mod' || rol === 'user') && (
          <div className="flex-1 flex flex-col">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<NavPrivada rol={rol} />}>
                  <Route index element={<Home />} />
                  <Route path="/podcasts/:id" element={<Podcast />} />
                  <Route path="/podcasts/:id/episode/:episodeid" element={<Episode />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/comments" element={<Comments />} />
                  <Route path="/protected" element={<Protected />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <Footer />
          </div>
        )}
        <footer className="py-4 text-center text-gray-400 text-xs bg-transparent mt-auto">
          © {new Date().getFullYear()} Podcastify. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}

export default App;
