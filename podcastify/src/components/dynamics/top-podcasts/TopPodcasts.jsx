import "animate.css";
import axios from "axios";
import React, { useState, useEffect, lazy, Suspense } from "react";
import ls from "localstorage-slim";

const Artists = lazy(() => import("./Artists"));

export default function TopPodcasts() {
  const [data, setData] = useState("");

  const LOCALSTORAGE_EXPIRATION_TIME = 60 * 60 * 24;
  const URL_API = `https://api.allorigins.win/get?url=${encodeURIComponent(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  )}`;

  useEffect(() => {
    if (!ls.get("toppodcast")) {
      axios
        .get(URL_API, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          try {
            ls.set("toppodcast", res.data.contents, {
              ttl: LOCALSTORAGE_EXPIRATION_TIME,
            });
            const parsedJson = JSON.parse(res.data.contents);
            setData(parsedJson);
          } catch (err) {
            console.error("Error al parsear el JSON" + err);
          }
        })
        .catch((err) => {
          console.err("Error de axios: " + err);
        });
    } else {
      setData(JSON.parse(ls.get("toppodcast")));
    }
  }, [URL_API, LOCALSTORAGE_EXPIRATION_TIME]);

  return (
    <>
      <section className="mb-12">
        <div className="m-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 animate__animated animate__fadeInUp">
          {Object.values(data).map((o) => {
            return (
              <>
                {Object.values(o.entry).map((ch, index) => {
                  return (
                    <>
                      <Suspense fallback={<p></p>}>
                        <Artists index={index} ch={ch} />
                      </Suspense>
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}
