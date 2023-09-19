const mysql = require ('mysql');

//Configuracion de conexion a la base de Datos

const db = mysql.createConnection({
    host: 'localhost',
    user: 'usuario',
    password:'contraseña',
    database: 'nombre de la base'

});
db.connect((err) => {
    if (err){
        console.error('Error en la Conexion de Datos: '+ err.message );
   
    }else{
        console.log('Conexion a la Base de Datos Establecida');
    }
});

// Consulta SQL para obtener todas las publicaciones
const obtenerPublicaciones = (callback) => {
    const sql = 'SELECT * FROM publicaciones';
    db.query(sql, (err,result) =>{
        if(err){
            console.error('Error al obtner las publicaciones: '+ err.message);
            callback(err, null);
        }else {
            callback(null, result);

        }
    });
};


module.exports = {
    obtenerPublicaciones,


    // agregar otras consultas

};



