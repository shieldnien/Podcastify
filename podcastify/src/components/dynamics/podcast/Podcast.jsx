import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ls from "localstorage-slim";

import Episodes from "../episodes/Episodes";
import { fetchFromApi } from "../../../utils/fetchFromApi";

export default function Podcast() {
  let { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const LOCALSTORAGE_EXPIRATION_TIME = 60 * 60 * 24;

  // Usar fetchFromApi con => get?url=${encodeURIComponent("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")}
  useEffect(() => {
    if (!ls.get(`podcast-${id}`)) {
      fetchFromApi(
        `get?url=${encodeURIComponent(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        )}`
      )
        .then((res) => {
          // Formato: podcast - ID del artista
          try {
            ls.set(`podcast-${id}`, res.contents, {
              ttl: LOCALSTORAGE_EXPIRATION_TIME,
            });
            setData(res.contents);
            setLoading(false);
          } catch (err) {
            console.error("Error al parsear el JSON: " + err);
          }
        })
        .catch((err) => {
          console.log("Error en la petición: " + err);
        });
    } else {
      let jsonData = JSON.stringify(ls.get(`podcast-${id}`));
      jsonData = jsonData.replace(/\0/g, "");
      const parsedJson = JSON.parse(jsonData);
      setData(parsedJson);
      setLoading(false);
    }
  }, [LOCALSTORAGE_EXPIRATION_TIME, id]);

  if (isLoading) {
    return <div>Loading</div>;
  }
  console.log(data)
  console.log(id)
    return (
      <>
        <div>
          <section className="flex flex-col">
            <Episodes
              ch={data}
              id={id}
            ></Episodes>
          </section>
        </div>

        {/* <div className="m-2">
          <section className="flex flex-col">
            {Object.values(data).map((o) => {
              return (
                <>
                  {Object.values(o.entry).map((ch) => {
                    if (ch.id.attributes["im:id"] === id) {
                      return (
                        <>
                          <Episodes
                            key={`${id}`}
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
        </div> */}
      </>
    );
}
