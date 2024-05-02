import "animate.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Artists({ ch }) {
  const data = JSON.parse(ch);

  console.log(JSON.parse(ch));

  return (
    <>
      {data.feed.entry.map((o) => {
        return (
          <>
            <div
              key={`${o.id.attributes["im:id"]}`}
              className="mx-16 my-4 rounded-lg overflow-hidden bg-transparent"
            >
              <picture className="m-2">
                <img
                  src={o["im:image"][2].label}
                  alt={o["im:artist"].label}
                  className="p-2 w-80 m-auto -my-4 rounded-full z-50"
                ></img>
              </picture>
              <div className="px-4 py-2 bg-white rounded">
                <div className="border-t-2 text-center -my-4 border-gray-200">
                  <Link
                    to={`/podcasts/${o.id.attributes["im:id"]}`}
                    className="m-4"
                  >
                    <div>
                      <span className="text-3xl text-black font-extrabold">
                        {o.title.label.split("-")[0]}
                      </span>
                      <span className="mt-4 block text-sm text-gray-400 italic">
                        Author: {o.title.label.split("-")[1]}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>{" "}
          </>
        );
      })}
    </>
  );
}
