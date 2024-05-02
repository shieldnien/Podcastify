import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ls from "localstorage-slim";
import { fetchFromApi } from "../../../utils/fetchFromApi";

export default function Episodes({ ch, id }) {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true)

  ch = JSON.parse(ch)

  //console.log(ch)
  console.log(ch)
  console.log(id)

  const LOCALSTORAGE_EXPIRATION_TIME = 60 * 60 * 24;

  useEffect(() => {
    if (!ls.get(`episodes-${id}`)) {
      fetchFromApi(
        `get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${id}&media=podcast
        &entity=podcastEpisode`
        )}`
      )
        .then((res) => {
          // Formato: episodes - ID del artista
          try {
            ls.set(`episodes-${id}`, res.contents, {
              ttl: LOCALSTORAGE_EXPIRATION_TIME,
            });
            setData(JSON.parse(res.contents));
            setLoading(false);
          } catch (err) {
            console.error("Error al parsear el JSON" + err);
          }
        })
        .catch((err) => {
          console.log("Error de axios: " + err);
        });
    } else {
      setData(JSON.parse(ls.get(`episodes-${id}`)));
      setLoading(false)
    }
  }, [LOCALSTORAGE_EXPIRATION_TIME, id]);


  if (isLoading) {
    return <div>Loading</div>
  }

  console.log(data)
  //console.log(parsedCh)

  if (data.results[0].collectionId == id) {
    return (
      <>
        <div className="h-fit max-h-screen text-center mx-auto rounded-lg shadow-lg bg-gray-100 animate__animated animate__fadeInLeft">
          <figure>
            <img
              className="w-fit m-auto rounded-full p-2"
              src={ch.feed.entry[0]['im:image'][0].label}
              alt="Foto de portada del podcast"
            ></img>
          </figure>
          <p className="text-2xl font-bold p-2 m-2 border-y border-gray-300">
            <span>{ch.feed.entry[0]['im:artist'].label}</span> by <span>{ch.feed.entry[0]['im:name'].label}</span>
          </p>
          <p className="p-2 m-4">{ch.feed.entry[0]['summary'].label}</p>
        </div>
        <div className="h-4/6 flex flex-col max-h-screen bg-gray-500 bg-opacity-50">
          <div className="text-center border m-2 border-gray-300 bg-gray-100 rounded shadow-lg">
            <h1 className="text-xl m-2">
              Episodios: <span className="font-bold">{data.resultCount}</span>
            </h1>
          </div>
          <div className="rounded-lg h-5/6  overflow-auto overscroll-contain hover:overflow-y-scroll m-2 text-white text-xl font-light animate__animated animate__fadeInRight animate__delay-1s">
            {/* INCOMPLETO, esta es la versión antigua */
              Object.values(data).map((o) => {
              return (
                <>
                  <ul>
                    {Object.values(o).map((child) => {
                      return (
                        <>
                          <li className="p-2 m-2 overflow-hidden">
                            <Link
                              key={id}
                              className="whitespace-nowrap p-2 m-2 shadow-lg bg-blue-500 rounded-lg border border-black visited:bg-green-900"
                              to={`/podcasts/${id}/episode/${child.trackId}`}
                            >
                              {child.trackName}
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
}
