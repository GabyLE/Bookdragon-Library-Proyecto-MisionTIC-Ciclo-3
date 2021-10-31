// Cargar libreria para oberar con BD MySQL
let mysql = require("mysql");

// Cargar el archivo de configuración
let configBD = require("../config/bd.config");

// Crear la conexion a la BD
let conexion = mysql.createConnection(
    {
        host: configBD.SERVIDOR,
        user: configBD.USUARIO,
        password: configBD.CLAVE,
        database: configBD.BASEDATOS
    }
);

// Abrir la conexion a la BD
conexion.connect(error => {
    if(error) throw error;
    // Mostrar por consola mensaje de conexión si no hubo error
    console.log("Conexión exitosa a la BD de Comercializadora");
}
);

module.exports = conexion;