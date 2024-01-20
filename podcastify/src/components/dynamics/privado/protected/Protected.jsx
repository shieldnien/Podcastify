import axios from "axios";
import { useEffect, useState } from "react";

export default function Protected() {
  // Implementar la ruta '/datosProtegidos' del backend con axios
  const [data, setData] = useState("");

  const token = sessionStorage.getItem("token");
  const URL_API = `http://localhost:8001/datosProtegidos`;

  useEffect(() => {
    axios
      .get(URL_API, {
        headers: {
          "authorization": `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error de axios: " + err);
      });
  }, []);

  return (
    <>
      <div>
        <pre>{data.mensaje}</pre>
      </div>
    </>
  );
}
