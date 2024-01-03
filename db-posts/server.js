const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors")

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "toor",
  database: "podcastify",
  port: 3309,
});

const app = express();
const secret = "miPrimeraChamba";
const port = 8001;

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());

app.use(cors())

// GET de los posts
app.get("/posts", (req, res) => {
  const responsePosts = {
    posts: [
      {
        id: "0",
        flavor:
          "Lorem et sint laboris culpa ad tempor. Et velit do id qui anim nulla et ullamco voluptate aute sit quis aliquip incididunt. Quis ullamco dolor officia aute qui consectetur labore ex nisi aliqua excepteur velit. Dolore amet ex voluptate aliqua anim nulla cupidatat sint consectetur sint cupidatat proident. Non esse irure ex culpa laborum adipisicing proident minim qui. Et aliquip aute min ad ullamco mollit adipisicing ex incididunt dolore. Aliqua exercitation ullamco nisi nulla enim mollit sit ut.",
        uploadedBy: "Nien",
      },
      {
        id: "1",
        flavor:
          "Lorem et sint laboris culpa ad tempor. Et velit do id qui anim nulla et ullamco voluptate aute sit quis aliquip incididunt. Quis ullamco dolor officia aute qui consectetur labore ex nisi aliqua excepteur velit. Dolore amet ex voluptate aliqua anim nulla cupidatat sint consectetur sint cupidatat proident. Non esse irure ex culpa laborum adipisicing proident minim qui. Et aliquip aute min ad ullamco mollit adipisicing ex incididunt dolore. Aliqua exercitation ullamco nisi nulla enim mollit sit ut.",
        uploadedBy: "Nien",
      },
      {
        id: "2",
        flavor:
          "Lorem et sint laboris culpa ad tempor. Et velit do id qui anim nulla et ullamco voluptate aute sit quis aliquip incididunt. Quis ullamco dolor officia aute qui consectetur labore ex nisi aliqua excepteur velit. Dolore amet ex voluptate aliqua anim nulla cupidatat sint consectetur sint cupidatat proident. Non esse irure ex culpa laborum adipisicing proident minim qui. Et aliquip aute min ad ullamco mollit adipisicing ex incididunt dolore. Aliqua exercitation ullamco nisi nulla enim mollit sit ut.",
        uploadedBy: "Nien",
      },
      {
        id: "3",
        flavor:
          "Lorem et sint laboris culpa ad tempor. Et velit do id qui anim nulla et ullamco voluptate aute sit quis aliquip incididunt. Quis ullamco dolor officia aute qui consectetur labore ex nisi aliqua excepteur velit. Dolore amet ex voluptate aliqua anim nulla cupidatat sint consectetur sint cupidatat proident. Non esse irure ex culpa laborum adipisicing proident minim qui. Et aliquip aute min ad ullamco mollit adipisicing ex incididunt dolore. Aliqua exercitation ullamco nisi nulla enim mollit sit ut.",
        uploadedBy: "Nien",
      },
      {
        id: "4",
        flavor:
          "Lorem et sint laboris culpa ad tempor. Et velit do id qui anim nulla et ullamco voluptate aute sit quis aliquip incididunt. Quis ullamco dolor officia aute qui consectetur labore ex nisi aliqua excepteur velit. Dolore amet ex voluptate aliqua anim nulla cupidatat sint consectetur sint cupidatat proident. Non esse irure ex culpa laborum adipisicing proident minim qui. Et aliquip aute min ad ullamco mollit adipisicing ex incididunt dolore. Aliqua exercitation ullamco nisi nulla enim mollit sit ut.",
        uploadedBy: "Nien",
      },
      {
        id: "5",
        flavor:
          "Lorem et sint laboris culpa ad tempor. Et velit do id qui anim nulla et ullamco voluptate aute sit quis aliquip incididunt. Quis ullamco dolor officia aute qui consectetur labore ex nisi aliqua excepteur velit. Dolore amet ex voluptate aliqua anim nulla cupidatat sint consectetur sint cupidatat proident. Non esse irure ex culpa laborum adipisicing proident minim qui. Et aliquip aute min ad ullamco mollit adipisicing ex incididunt dolore. Aliqua exercitation ullamco nisi nulla enim mollit sit ut.",
        uploadedBy: "Nien",
      },
    ],
  };

  res.send(responsePosts);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //let userDB, userDBid;
  const query = `SELECT * FROM podcastify.usuarios WHERE USERNAME = '${username}' AND PASSWORD = '${password}'`;

  connection.query(query, (error, resQuery) => {
      if (error) {
        console.error(error);
        return;
      }
      //console.log('exito', res)
      // rdp = valor de la fila RowDataPacket

      /*     res.map((rdp) => {
      console.log(rdp.USER_ID)
    }) */

      const filtrado = resQuery.filter((rdp) => rdp.USERNAME === username);

      if (filtrado.length > 0) {
        if (username === filtrado[0].USERNAME && password === filtrado[0].PASSWORD) {
          const token = jwt.sign({ username, password }, secret, { expiresIn: "10h" });
          const rol = filtrado[0].ROLE;

          res.json({ rol,token });
        } else {
          res.status(400).json({
            error: "failed",
          });
        }
      } else {
        res.json({'error': 'Credenciales incorrectas'})
      }
    }
  );

  /*   const username = 'elWeboDelAsen';
  const userId = 1; */

  /*   if (!userForm || !idForm) {
    res.status(400).json({
      error: "Failed",
    });
  } else {
    res.send({
      check: "Success",
    });
  }*/
});

// Endpoint protegido que requiere el token para acceder
app.get("/datosProtegidos", verificarToken, (req, res) => {
  // Si el token es válido, se puede acceder a los datos protegidos
  // En este ejemplo, simplemente se devuelve un mensaje
  res.json({ mensaje: "¡Cállate ya, Lourdes!" });
});

// Middleware para verificar el token
function verificarToken(req, res, next) {
  // Hay que partir el token en [bearer, token]
  const token = req.headers["authorization"].split(' ')[1];

  if (typeof token !== "undefined") {
    jwt.verify(token, secret, (err, authData) => {
      if (err) {
        console.error("Error al verificar el token:", err);
        res.sendStatus(403); // Forbidden
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

app.listen(port, () => {
  console.log(`Server arrancado en el puerto ${port}`);
});
