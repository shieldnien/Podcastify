import 'animate.css'
import React from "react";
import { Link } from "react-router-dom";

export default function Artists({ index, ch }) {
  return (
    <>
      <div key={index} className="group relative flex flex-col items-center justify-between bg-gradient-to-br from-indigo-700 via-fuchsia-700 to-purple-800 rounded-2xl shadow-2xl p-6 m-4 transition-transform hover:scale-105 hover:shadow-fuchsia-500/30 border-2 border-fuchsia-700/30">
        <picture className="mb-4">
          <img
            src={ch["im:image"][2].label}
            alt={ch["im:artist"].label}
            className="w-32 h-32 rounded-full border-4 border-fuchsia-400 shadow-lg object-cover group-hover:scale-110 transition-transform duration-200"
          />
        </picture>
        <div className="w-full text-center">
          <Link to={`/podcasts/${ch.id.attributes["im:id"]}`} className="block">
            <span className="text-2xl font-extrabold text-white drop-shadow-sm block mb-1 truncate">
              {ch.title.label.split("-")[0]}
            </span>
            <span className="text-sm text-fuchsia-200 italic block mb-2 truncate">
              {ch.title.label.split("-")[1] ? `Autor: ${ch.title.label.split("-")[1]}` : ''}
            </span>
            <span className="inline-block mt-2 px-4 py-1 rounded-full bg-white/10 text-fuchsia-100 text-xs font-semibold tracking-wide border border-fuchsia-400/30 group-hover:bg-fuchsia-600/30 transition">Ver Podcast</span>
          </Link>
        </div>
      </div>
    </>
  );
}
