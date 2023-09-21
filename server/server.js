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

app.get("/publicaciones", (req, res) => {
  // Realiza una consulta SQL para obtener todas las publicaciones desde la base de datos
  const query = "SELECT * FROM PUBLICACION";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener las publicaciones: " + err.message);
      res.status(500).json({ error: "Error al obtener las publicaciones" });
    } else {
      res.json(result); // Devuelve las publicaciones como una respuesta JSON
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


app.post("/crearpublicacion", (req, res) => {
  const { tipo, fecha, autorEmail, autorRegistro, tipoContenido, contenido } = req.body;
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




app.delete("/eliminarpublicacion/:id", (req, res) => {
  const idPublicacion = req.params.id;
  const query = "DELETE FROM PUBLICACION WHERE id = ?";
  db.query(query, [idPublicacion], (err, result) => {
    if (err) {
      console.error("Error al eliminar la publicación: " + err.message);
      res.status(500).json({ error: "Error al eliminar la publicación" });
    } else {
      if (result.affectedRows > 0) {
        console.log("Publicación eliminada exitosamente");
        res.json({ message: "Publicación eliminada exitosamente" });
      } else {
        console.log("No se encontró la publicación o no tienes permiso para eliminarla");
        res.status(401).json({ error: "No se encontró la publicación o no tienes permiso para eliminarla" });
      }
    }
  });
});


app.put("/modificarcomentario/:id", (req, res) => {
  const idComentario = req.params.id;
  const { contenido } = req.body;
  const query = "UPDATE COMENTARIO SET contenido = ? WHERE id = ?";
  db.query(query, [contenido, idComentario], (err, result) => {
    if (err) {
      console.error("Error al modificar el comentario: " + err.message);
      res.status(500).json({ error: "Error al modificar el comentario" });
    } else {
      if (result.affectedRows > 0) {
        console.log("Comentario modificado exitosamente");
        res.json({ message: "Comentario modificado exitosamente" });
      } else {
        console.log("No se encontró el comentario o no tienes permiso para modificarlo");
        res.status(401).json({ error: "No se encontró el comentario o no tienes permiso para modificarlo" });
      }
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

