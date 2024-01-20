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

  const getURLonClick = (id, url) => {
    ls.set(`idCurrentPlay`, id);
    ls.set(`currentPlay`, url);
    console.log(ls.get(`idCurrentPlay`), ls.get(`currentPlay`));
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 mb-12 grid-cols-1">
        {Object.values(data).map((o) => {
          return (
            <>
              {Object.values(o).map((ch) => {
                if (ch.trackId === parseInt(episodeid)) {
                  return (
                    <>
                      <div className="h-fit mx-4 mt-2 text-center rounded-lg overflow-hidden shadow-lg bg-gray-100 animate__animated animate__fadeInLeft">
                        <figure>
                          <img
                            className="w-48 m-auto rounded-full p-2"
                            src={ch.artworkUrl600}
                            alt="Foto de portada del podcast"
                          ></img>
                        </figure>
                        <p className="p-2 text-2xl font-bold border-y border-gray-300">
                          <span>{ch.artistName}</span> by{" "}
                          <span>{ch.collectionName}</span>
                        </p>
                      </div>
                      <div className="max-w-4xl h-5/6 md:h-full overflow-y-auto m-2 bg-gray-100 rounded overflow-hidden shadow-lg">
                        <p className="p-2 block font-bold text-lg">
                          {ch.trackName}
                        </p>
                        <p className="px-6 py-2 border-t border-gray-300">
                          {ch.description}
                        </p>
                        <div className="text-center">
                          <button
                            className="w-12 h-12 relative"
                            onClick={() =>
                              getURLonClick(ch.trackId, ch.episodeUrl)
                            }
                          >
                            Click!
                          </button>
                        </div>
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
