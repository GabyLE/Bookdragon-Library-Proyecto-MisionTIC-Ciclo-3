// Cargar la libreria con la conexion a la bd
let sql = require('./bd');
// Cargar el archivo de configuración
let authConfig = require("../config/auth.config");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(authConfig.CLIENT_ID);

// constructor 
let Usuario = function (usuario) {
    this.id = usuario.Id;
    this.usuario = usuario.Usuario;
    this.nombre = usuario.Nombre;
    this.clave = usuario.Clave;
    this.idRol = usuario.IdRol;
    this.idEstado = usuario.IdEstado;
}
// Metodo que agrega un registro
function agregarUsuario(usuario, clave) {
    return new Promise((resolve, reject) => {
        sql.query('CALL spAgregarUsuario(-1,?,?);',
            [usuario, clave],
            (err, res) => {
                if (err) {
                    return reject(err);
                }
                else {
                    if (res.length == 0) {
                        resolve(-1);
                    }
                    else {
                        resolve(res[0]);
                    }
                }
            });
    });
}

// Acceder con Google
Usuario.googleLogin = (token, resultado) => {

    console.log(token.tokenId);

    client.verifyIdToken({
        idToken: token.tokenId,
        audience: authConfig.CLIENT_ID
    }).then((res => {
        const { email_verified, email } = res.getPayload()
        if (email_verified) {
            sql.query("CALL spValidarAccesoUsuario( ?, ' ');",
                [email],
                async function (err, res) {
                    //Verificar si hubo error ejecutando la consulta
                    if (err) {
                        console.log("Error validando acceso:", err);
                        resultado(err, null);
                        return;
                    }
                    //La consulta devuelve resultados
                    if (res.length && res[0].length) {
                        console.log("Usuario encontrado :", res[0]);
                        resultado(null, res[0]);
                        return;
                    }
                    // //No se encontraron registros
                    // resultado({ tipo: "No encontrado" }, null);
                    // console.log("Credenciales no válidas");
                    res = await agregarUsuario(email, ' ');
                    resultado(null, res);
                });
        }
        console.log(res.getPayload())
    }))


}


//Metodo que valida las credenciales de un usuario
Usuario.validarAcceso = (usuario, clave, resultado) => {
    sql.query("CALL spValidarAccesoUsuario( ?, ?);",
        [usuario, clave],
        async function (err, res) {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                console.log("Error validando acceso:", err);
                resultado(err, null);
                return;
            }
            //La consulta devuelve resultados
            if (res.length && res[0].length) {
                console.log("Usuario encontrado :", res[0]);
                resultado(null, res[0]);
                return;
            }
            // //No se encontraron registros
            // resultado({ tipo: "No encontrado" }, null);
            // console.log("Credenciales no válidas");
            res = await agregarUsuario(usuario, clave);
            resultado(null, res);
        });
}

// Metodo que obtiene la lista de usuarios
Usuario.listar = (resultado) => {
    sql.query('CALL spListarUsuarios;', (err, res) => {
        // Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando la lista de usuarios:", err);
            resultado(err, null);
            return;
        }
        // La consulta devuelve resultados
        console.log("Lista de usuarios encontrados: ", res[0]);
        resultado(null, res[0]);
    });
}

Usuario.actualizar = (usuario, resultado) => {
    sql.query('CALL spActualizarUsuario(?,?,?,?);',
        [usuario.Id, usuario.Nombre, usuario.IdRol, usuario.IdEstado],
        (err, res) => {
            // verificar si hubo error ejectutando la consulta
            if (err) {
                console.log("Error actualizando usuario:", err);
                resultado(err, null);
                return;
            }
            // La consulta no efectó registros
            if (res.affectedRows == 0) {
                // No se encontraron registros
                resultado({ tipo: "No encontrado" }, null);
                return;
            }

            console.log("Usuario actualizado: ", usuario);
            resultado(null, { usuario });
        }
    );

}


// Metodo que elimina un registro
Usuario.eliminar = (idUsuario, resultado) => {
    sql.query('DELETE FROM Usuario WHERE Id = ?', idUsuario, (err, res) => {
        // Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error eliminado el usuario:", err);
            resultado(err, null);
            return;
        }
        //La consulta no afectó registros
        if (res.affectedRows == 0) {
            // No se encontraron registros
            resultado({ tipo: "No encontrado" }, null);
            return;
        }
        console.log("Usuario eliminado con id: ", idUsuario);
        resultado(null, res);
    });
}


module.exports = Usuario;