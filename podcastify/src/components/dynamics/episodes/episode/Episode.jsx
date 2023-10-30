import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ls from "localstorage-slim";

export default function Episode() {
  let { id } = useParams();
  let { episodeid } = useParams();

  const [data, setData] = useState({});

  const LOCALSTORAGE_EXPIRATION_TIME = 60 * 60 * 24;
  const URL_API = `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast
        &entity=podcastEpisode`
  )}`;

  useEffect(() => {
    // Formato: episode - ID del artista - ID del episodio
    if (!ls.get(`episode-${id}-${episodeid}`)) {
      axios
        .get(URL_API, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          try {
            ls.set(`episode-${id}-${episodeid}`, res.data.contents, {
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
      setData(JSON.parse(ls.get(`episode-${id}-${episodeid}`)));
    }
  }, [URL_API, LOCALSTORAGE_EXPIRATION_TIME, id, episodeid]);


  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1">
        {Object.values(data).map((o) => {
          console.log(o);
          return (
            <>
              {Object.values(o).map((ch) => {
                if (ch.trackId === parseInt(episodeid)) {
                  return (
                    <>
                      <div className="max-w-sm text-center h-fit p-4 m-2 bg-gray-100 rounded overflow-hidden shadow-lg">
                        <figure>
                          <img
                            className="p-2 w-full rounded-full"
                            src={ch.artworkUrl600}
                            alt="Foto de portada del podcast"
                          ></img>
                        </figure>
                        <p className="p-2 text-2xl font-bold border-y border-gray-300">
                          <span>{ch.artistName}</span> by{" "}
                          <span>{ch.collectionName}</span>
                        </p>
                      </div>
                      <div className="max-w-4xl m-2 h-fit bg-gray-100 rounded overflow-hidden shadow-lg">
                        <p className="p-2 block font-bold text-lg">
                          {ch.trackName}
                        </p>
                        <p className="p-4 border-t border-gray-300">
                          {ch.description}
                        </p>
                        <audio
                          className="p-2 w-full border-t border-gray-300"
                          src={ch.episodeUrl}
                          controls="controls"
                          preload="none"
                        ></audio>
                      </div>
                    </>
                  );
                }
              })}
            </>
          );
        })}
      </div>
    </>
  );
}
