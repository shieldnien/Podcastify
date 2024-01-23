import 'animate.css'
import React from "react";
import { Link } from "react-router-dom";

export default function Artists({ index, ch }) {
  return (
    <>
      <div key={index} className="mx-16 my-4 rounded-lg overflow-hidden bg-transparent">
        <picture className="m-2">
          <img
            src={ch["im:image"][2].label}
            alt={ch["im:artist"].label}
            className="p-2 w-80 m-auto -my-4 rounded-full z-50"
          ></img>
        </picture>
        <div className="px-4 py-2 bg-white">
          <div className="border-t-2 text-center -my-4 border-gray-200">
            <Link to={`/podcasts/${ch.id.attributes["im:id"]}`} className="m-4">
              <div>
                <span className="text-3xl text-black font-extrabold">
                  {ch.title.label.split("-")[0]}
                </span>
                <span className="mt-4 block text-sm text-gray-400 italic">
                  Author: {ch.title.label.split("-")[1]}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
