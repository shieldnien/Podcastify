import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ls from "localstorage-slim";

import Episodes from "../episodes/Episodes";

export default function Podcast() {
  let { id } = useParams();

  const [data, setData] = useState("");

  const LOCALSTORAGE_EXPIRATION_TIME = 60 * 60 * 24;
  const URL_API = `https://api.allorigins.win/get?url=${encodeURIComponent(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  )}`;

  useEffect(() => {
    if (!ls.get(`podcast-${id}`)) {
      axios
        .get(URL_API, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // Formato: podcast - ID del artista
          try {
            ls.set(`podcast-${id}`, res.data.contents, {
              ttl: LOCALSTORAGE_EXPIRATION_TIME,
            });
            const parsedJson = JSON.parse(res.data.contents);
            setData(parsedJson);
          } catch (err) {
            console.error("Error al parsear el JSON: " + err);
          }
        })
        .catch((err) => {
          console.log("Error de axios: " + err);
        });
    } else {
      setData(JSON.parse(ls.get(`podcast-${id}`)));
    }
  }, [URL_API, LOCALSTORAGE_EXPIRATION_TIME, id]);

  return (
    <>
      <div className="m-2">
        <section className="grid grid-cols-2">
          {Object.values(data).map((o) => {
            return (
              <>
                {Object.values(o.entry).map((ch, index) => {
                  if (ch.id.attributes["im:id"] === id) {
                    return (
                      <>
                        <Episodes
                          key={index}
                          id={id}
                          imArtist={ch["im:artist"].label}
                          imName={ch["im:name"].label}
                          imImg={ch["im:image"][2].label}
                          summary={ch.summary.label}
                        ></Episodes>
                      </>
                    );
                  }
                })}
              </>
            );
          })}
        </section>
      </div>
    </>
  );
}
