import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ls from "localstorage-slim";

export default function Episodes(props) {
  const [data, setData] = useState("");

  const LOCALSTORAGE_EXPIRATION_TIME = 60 * 60 * 24;
  const URL_API = `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${props.id}&media=podcast
    &entity=podcastEpisode`
  )}`;

  useEffect(() => {
    if (!ls.get(`episodes-${props.id}`)) {
      axios
        .get(URL_API, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // Formato: episodes - ID del artista
          try {
            ls.set(`episodes-${props.id}`, res.data.contents, {
              ttl: LOCALSTORAGE_EXPIRATION_TIME,
            });
            const parsedJson = JSON.parse(res.data.contents);
            setData(parsedJson);
          } catch (err) {
            console.error("Error al parsear el JSON" + err);
          }
        })
        .catch((err) => {
          console.log("Error de axios: " + err);
        });
    } else {
      setData(JSON.parse(ls.get(`episodes-${props.id}`)));
    }
  }, [URL_API, LOCALSTORAGE_EXPIRATION_TIME, props.id]);

  return (
    <>
      <div className="h-fit max-h-screen text-center mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-indigo-700 via-fuchsia-700 to-purple-800 p-6 animate__animated animate__fadeInLeft border-2 border-fuchsia-700/30">
        <figure>
          <img
            className="w-32 h-32 m-auto rounded-full border-4 border-fuchsia-400 shadow-lg object-cover"
            src={props.imImg}
            alt="Foto de portada del podcast"
          />
        </figure>
        <p className="text-2xl font-extrabold text-white p-2 m-2 border-y border-fuchsia-400/40">
          <span>{props.imArtist}</span> <span className="text-fuchsia-200 font-light">by</span> <span>{props.imName}</span>
        </p>
        <p className="p-2 m-4 text-fuchsia-100 text-base italic">{props.summary}</p>
      </div>
      <div className="h-4/6 flex flex-col max-h-screen bg-white/10 rounded-2xl shadow-xl mt-6">
        <div className="text-center border m-2 border-fuchsia-400/30 bg-white/10 rounded-xl shadow">
          <h1 className="text-xl m-2 text-white">
            Episodios: <span className="font-bold text-fuchsia-300">{data.resultCount}</span>
          </h1>
        </div>
        <div className="rounded-2xl h-5/6 overflow-auto overscroll-contain hover:overflow-y-scroll m-2 text-white text-lg font-light animate__animated animate__fadeInRight animate__delay-1s">
          {Object.values(data).map((o) => {
            return (
              <ul key={o.collectionId} className="list-none">
                {Object.values(o).map((ch, index) => {
                  return (
                    <li key={ch.trackId || index} className="p-2 m-2">
                      <Link
                        className="block w-full text-left px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-semibold shadow-lg border border-fuchsia-400/30 hover:scale-105 hover:bg-fuchsia-700/80 transition-all duration-150 truncate"
                        to={`/podcasts/${props.id}/episode/${ch.trackId}`}
                      >
                        {ch.trackName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}
