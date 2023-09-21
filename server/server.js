const express = require ('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require("express-session");
const cors = require('cors');
const app = express()

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"asdf",
  database:"APLICACIONA"
})


app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  // Envía una respuesta simple al acceder a la ruta raíz
  res.json("Conexión exitosa entre el frontend y el backend" );
});
app.use(
  session({
    secret: "sesion",
    resave: false,
    saveUninitialized: true,
  })
);
app.post("/signup", (req, res) => {
  // Obtén los datos del formulario desde la solicitud
  const { name, reg, email, password } = req.body;

  // Inserta los datos en la tabla USUARIO
  const query = "INSERT INTO USUARIO (REGISTROA, NOMBRE, CONTRASENA, CORREO) VALUES (?, ?, ?, ?)";
  db.query(query, [reg, name, password, email], (err, result) => {
    if (err) {
      console.error("Error al registrar el usuario: " + err.message);
      res.status(500).json({ error: "Error al registrar el usuario" });
    } else {
      console.log("Usuario registrado exitosamente");
      res.json({ message: "Usuario registrado exitosamente" });
    }
  });
});

app.post("/crearPublicacion", (req, res) => {
  // Obtén los datos del formulario para crear una nueva publicación desde la solicitud
  const { tipo, fecha, autorEmail, autorRegistro, tipoContenido, contenido } = req.body;

  // Inserta los datos en la tabla PUBLICACION
  const query = "INSERT INTO PUBLICACION (tipo, fecha, autorEmail, autorRegistro, tipoContenido, contenido) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [tipo, fecha, autorEmail, autorRegistro, tipoContenido, contenido], (err, result) => {
    if (err) {
      console.error("Error al crear la publicación: " + err.message);
      res.status(500).json({ error: "Error al crear la publicación" });
    } else {
      console.log("Publicación creada exitosamente");
      res.json({ message: "Publicación creada exitosamente" });
    }
  });
});

app.post("/agregarComentario", (req, res) => {
  // Obtén los datos del formulario desde la solicitud
  const { publicacionId, contenido, autorEmail } = req.body;

  // Obtén la fecha actual en el formato correcto (YYYY-MM-DD)
  const fechaActual = new Date().toISOString().slice(0, 10);

  // Inserta los datos en la tabla COMENTARIO
  const query = "INSERT INTO COMENTARIO (publicacionId, autorEmail, fecha, contenido) VALUES (?, ?, ?, ?)";
  db.query(query, [publicacionId, autorEmail, fechaActual, contenido], (err, result) => {
    if (err) {
      console.error("Error al agregar el comentario: " + err.message);
      res.status(500).json({ error: "Error al agregar el comentario" });
    } else {
      console.log("Comentario agregado exitosamente");
      res.json({ message: "Comentario agregado exitosamente" });
    }
  });
});

app.get("/cursos", (req, res) => {
  // Realiza una consulta SQL para obtener los nombres de los cursos
  const query = "SELECT NOMBRE FROM CURSO";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener los nombres de los cursos: " + err.message);
      res.status(500).json({ error: "Error al obtener los nombres de los cursos" });
    } else {
      // Devuelve los nombres de los cursos como respuesta JSON
      const nombresCursos = result.map((row) => row.NOMBRE);
      res.json(nombresCursos);
    }
  });
});

app.post("/agregarPublicacion", (req, res) => {
  // Obtén los datos del formulario desde la solicitud
  const { tipo, contenido, usuarioEmail } = req.body;

  // Inserta los datos en la tabla PUBLICACION
  const query = "INSERT INTO PUBLICACION (tipo, fecha, autorEmail, tipoContenido, contenido) VALUES (?, NOW(), ?, 'Texto', ?)";
  db.query(query, [tipo, usuarioEmail, contenido], (err, result) => {
    if (err) {
      console.error("Error al agregar la publicación: " + err.message);
      res.status(500).json({ error: "Error al agregar la publicación" });
    } else {
      console.log("Publicación agregada exitosamente");
      res.json({ message: "Publicación agregada exitosamente" });
    }
  });
});

app.get("/publicaciones", (req, res) => {
  // Realiza una consulta SQL para obtener todas las publicaciones y sus comentarios
  const query = `
    SELECT P.*, C.id AS comentarioId, C.autorEmail AS comentarioAutorEmail, C.contenido AS comentarioContenido
    FROM PUBLICACION P
    LEFT JOIN COMENTARIO C ON P.id = C.publicacionId
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener las publicaciones: " + err.message);
      res.status(500).json({ error: "Error al obtener las publicaciones" });
    } else {
      // Procesar los resultados para agrupar comentarios por publicación
      const publicacionesConComentarios = [];

      // Utilizar un mapa para agrupar comentarios por ID de publicación
      const publicacionesMap = new Map();
      result.forEach((row) => {
        const { id, tipo, fecha, autorEmail, contenido, comentarioId, comentarioAutorEmail, comentarioContenido } = row;
        if (!publicacionesMap.has(id)) {
          // Si la publicación no está en el mapa, crear una entrada para ella
          publicacionesMap.set(id, {
            id,
            tipo,
            fecha,
            autorEmail,
            contenido,
            comentarios: [],
          });
        }

        // Agregar el comentario a la publicación correspondiente
        if (comentarioId) {
          publicacionesMap.get(id).comentarios.push({
            id: comentarioId,
            autorEmail: comentarioAutorEmail,
            contenido: comentarioContenido,
          });
        }
      });

      // Convertir el mapa de publicaciones de nuevo en un arreglo
      publicacionesMap.forEach((value) => {
        publicacionesConComentarios.push(value);
      });

      res.json(publicacionesConComentarios); // Devuelve las publicaciones con comentarios como respuesta JSON
    }
  });
});

app.get("/buscar", (req, res) => {
  const { termino } = req.query; // Obtén el término de búsqueda de la solicitud
  // Realiza una consulta SQL para buscar publicaciones por nombre de curso o catedrático
  const query = `
    SELECT P.*
    FROM PUBLICACION P
    LEFT JOIN CURSO C ON P.tipo = C.NOMBRE
    WHERE C.NOMBRE LIKE ? OR P.tipoContenido LIKE ?;
  `;
  db.query(query, [`%${termino}%`, `%${termino}%`], (err, result) => {
    if (err) {
      console.error("Error al realizar la búsqueda: " + err.message);
      res.status(500).json({ error: "Error al realizar la búsqueda" });
    } else {
      // Devuelve los resultados de la búsqueda como respuesta JSON
      res.json(result);
    }
  });
});


app.post("/login", (req, res) => {
  // Obtén los datos del formulario desde la solicitud
  const { email, password } = req.body;

  // Verifica el usuario en la base de datos
  const query = "SELECT * FROM USUARIO WHERE CORREO = ? AND CONTRASENA = ?";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Error al verificar el usuario: " + err.message);
      res.status(500).json({ error: "Error al verificar el usuario" });
    } else {
      if (result.length > 0) {
        console.log("Inicio de sesión exitoso");

        // Almacenar información en la sesión
        req.session.user = {
          email: email,
          // Otras variables de sesión que desees almacenar
        };

        res.json({ message: "Inicio de sesión exitoso" });
      } else {
        console.log("Credenciales incorrectas");
        res.status(401).json({ error: "Credenciales incorrectas" });
      }
    }
  });
});


app.post("/updatepassword", (req, res) => {
  // Obtén los datos del formulario desde la solicitud
  const { email, reg, newPassword } = req.body;

  // Actualiza la contraseña en la base de datos
  const query = "UPDATE USUARIO SET CONTRASENA = ? WHERE CORREO = ? AND REGISTROA = ?";
  db.query(query, [newPassword, email, reg], (err, result) => {
    if (err) {
      console.error("Error al actualizar la contraseña: " + err.message);
      res.status(500).json({ error: "Error al actualizar la contraseña" });
    } else {
      if (result.affectedRows > 0) {
        console.log("Contraseña actualizada exitosamente");
        res.json({ message: "Contraseña actualizada exitosamente" });
      } else {
        console.log("Credenciales incorrectas o usuario no encontrado");
        res.status(401).json({ error: "Credenciales incorrectas o usuario no encontrado" });
      }
    }
  });
});


app.get("/publicaciones", (req, res) => {
  const query = "SELECT * FROM PUBLICACION";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener las publicaciones: " + err.message);
      res.status(500).json({ error: "Error al obtener las publicaciones" });
    } else {
      res.json(result);
    }
  });
});






app.listen(8000, ()=>{
  console.log("conectado al backend!")
})

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: " + err.message);
  } else {
    console.log("Conexión a la base de datos exitosa");
  }
});

