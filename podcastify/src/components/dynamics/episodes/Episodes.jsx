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
      <div className="h-fit max-h-screen text-center mx-auto rounded-lg shadow-lg bg-gray-100 animate__animated animate__fadeInLeft">
        <figure>
          <img
            className="w-fit m-auto rounded-full p-2"
            src={props.imImg}
            alt="Foto de portada del podcast"
          ></img>
        </figure>
        <p className="text-2xl font-bold p-2 m-2 border-y border-gray-300">
          <span>{props.imArtist}</span> by <span>{props.imName}</span>
        </p>
        <p className="p-2 m-4">{props.summary}</p>
      </div>
      <div className="h-4/6 flex flex-col max-h-screen bg-gray-500 bg-opacity-50">
        <div className="text-center border m-2 border-gray-300 bg-gray-100 rounded shadow-lg">
          <h1 className="text-xl m-2">
            Episodios: <span className="font-bold">{data.resultCount}</span>
          </h1>
        </div>
        <div className="rounded-lg h-5/6  overflow-auto overscroll-contain hover:overflow-y-scroll m-2 text-white text-xl font-light animate__animated animate__fadeInRight animate__delay-1s">
          {Object.values(data).map((o) => {
            return (
              <>
              <ul>
              {Object.values(o).map((ch,index) => {
                  return (
                    <>
                    <li className="p-2 m-2 overflow-hidden">
                    <Link
                          key={index}
                          className="whitespace-nowrap p-2 m-2 shadow-lg bg-blue-500 rounded-lg border border-black visited:bg-green-900"
                          to={`/podcasts/${props.id}/episode/${ch.trackId}`}
                        >
                          {ch.trackName}
                        </Link>
                    </li>
                        
                    </>
                  );
                })}
              </ul>
                
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
