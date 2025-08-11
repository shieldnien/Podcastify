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
    // Dispara un evento personalizado para notificar al Footer
    window.dispatchEvent(new Event('storage'));
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
                      <div className="h-fit mx-4 mt-2 text-center rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-700 via-fuchsia-700 to-purple-800 animate__animated animate__fadeInLeft border-2 border-fuchsia-700/30 p-6">
                        <figure>
                          <img
                            className="w-40 h-40 m-auto rounded-full border-4 border-fuchsia-400 shadow-lg object-cover"
                            src={ch.artworkUrl600}
                            alt="Foto de portada del podcast"
                          />
                        </figure>
                        <p className="p-2 text-2xl font-extrabold text-white border-y border-fuchsia-400/40">
                          <span>{ch.artistName}</span> <span className="text-fuchsia-200 font-light">by</span> <span>{ch.collectionName}</span>
                        </p>
                      </div>
                      <div className="max-w-4xl h-5/6 md:h-full overflow-y-auto m-2 bg-white/10 rounded-2xl overflow-hidden shadow-xl p-6">
                        <p className="p-2 block font-bold text-xl text-fuchsia-200">
                          {ch.trackName}
                        </p>
                        <p className="px-6 py-2 border-t border-fuchsia-400/20 text-white/90">
                          {ch.description}
                        </p>
                        <div className="text-center mt-4">
                          <button
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform text-lg"
                            onClick={() =>
                              getURLonClick(ch.trackId, ch.episodeUrl)
                            }
                          >
                            Reproducir episodio
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
