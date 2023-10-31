import React from "react";
import { Link } from "react-router-dom";

export default function Artists({ index, ch }) {
  return (
    <>
      <div key={index} className="m-4 rounded-lg overflow-hidden shadow-lg bg-gray-100">
        <picture className="m-2">
          <img
            src={ch["im:image"][2].label}
            alt={ch["im:artist"].label}
            className="p-2 h-auto m-auto rounded-full shadow-md"
          ></img>
        </picture>
        <div className="px-4 py-2">
          <div className="text-center p-2 border-t-2 border-gray-200">
            <Link to={`/podcasts/${ch.id.attributes["im:id"]}`} className="m-4">
              <div>
                <span className="m-fit text-3xl font-extrabold">
                  {ch.title.label.split("-")[0]}
                </span>
                <span className="m-4 block text-sm text-gray-400 italic">
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
