import "animate.css";
import React, { useState, useEffect } from "react";
import ls from "localstorage-slim";
import { fetchFromApi } from "../../../utils/fetchFromApi";
import Artists from "./Artists";

//const Artists = lazy(() => import("./Artists"));

export default function TopPodcasts() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true)

  const LOCALSTORAGE_EXPIRATION_TIME = 60 * 60 * 24;

  useEffect(() => {
    if (!ls.get("toppodcast")) {
      fetchFromApi(`get?url=${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`)
        .then((res) => {
          try {
            console.log(res.contents)
            ls.set("toppodcast", res.contents, {
              ttl: LOCALSTORAGE_EXPIRATION_TIME,
            });
            setData(res.contents);
            setLoading(false)
          } catch (err) {
            console.error("Error al parsear el JSON" + err);
          }
        })
        .catch((err) => {
          console.error("Error de axios: " + err);
        });
    } else {
      let jsonData = JSON.stringify(ls.get("toppodcast"))
      jsonData = jsonData.replace(/\0/g, '')
      const parsedJson = JSON.parse(jsonData)
      //console.log(parsedJson)
      setData(parsedJson)
      setLoading(false)
      //setData(ls.get("toppodcast"));
    }
  }, [LOCALSTORAGE_EXPIRATION_TIME]);

  if (isLoading) {
    return <div>Loading</div>
  }
  return (
    <>
      <section className="mb-20">
        <div className="m-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 animate__animated animate__fadeInUp">
        <Artists ch={data}></Artists>
        </div>
      </section>
    </>
  );
}
