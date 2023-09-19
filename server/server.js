const express = require ('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('./db');

const app = express ();

//configuacion de bodyparser para procesar JSON
app.use(bodyParser.json());


// Rutas para registro de usuario
app.post('/registro', (req, res) => {
    const {nombre, correo, contraseña } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(sql, [correo], (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta: ' + err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (result.length > 0) {
                res.status(400).json({ error: 'El correo ya está registrado' });
            } else {
                // El correo no está registrado, registar en la base de datos
                const insertSql = 'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)';
                db.query(insertSql, [nombre, correo, contraseña], (insertErr) => {
                    if (insertErr) {
                        console.error('Error al registrar usuario: ' + insertErr.message);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    } else {
                        res.json({ mensaje: 'Registro exitoso' });
                    }
                });
            }
        }
    });
});

app.post('/inicio-sesion', (req, res) => {
    const {correo, contraseña} = req.body;
    //verificacion de las credenciales en la base de datos
    const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?';
    db.query(sql, [correo, contraseña], (err, result) => {
        if (err){
            console.error('Error al realizar la consuta: ' + err.message);
            res.status(500).json({ error: 'Error interno del servidor '});

        } else {
            if (result.length > 0 ){
                res.json({mensaje: 'Inicio de sesion Exitoso '});

            } else{
                res.status(401).json({ error: 'Credenciales Incorrectas '});
            }
        }
    });
});

app.get('/publicaciones', (req, res) => {
    db.obtenerPublicaiones((err, result) =>{
        if (err){
            res.status(500).json({error: 'Error interno del servidor'});
        } else {
            res.json(result);
        }
    });
});

app.post('/publicaciones', (req, res) => {
    const {usario, curso, mensaje } = req.body;
    const insertSql = 'INSERT INTO publicaciones (usuario, curso, mensaje) VALUES (?, ?, ?)';
    db.query(insertSql, [usuario, curso, mensaje], (err) => {
        if (err) {
            console.error('Error al crear la publicación: ' + err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.json({ mensaje: 'Publicación creada con éxito' });
        }
    });
});


// Puerto en el que se ejecuta el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);

});