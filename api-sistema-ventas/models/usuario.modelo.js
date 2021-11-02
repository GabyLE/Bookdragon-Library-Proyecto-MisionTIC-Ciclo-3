// Cargar la libreria con la conexion a la bd
let sql = require('./bd');
// Cargar el archivo de configuración
let authConfig = require("../config/auth.config");
// cargar libreria oauth2 google
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(authConfig.CLIENT_ID);
// cargar la libreria de encriptado
var Bcrypt = require('bcrypt');


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
                    reject(err);
                }
                else {
                    if (res.length == 0) {
                        resolve('');
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
            sql.query("CALL spValidarAccesoUsuario( ?, '.');",
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
                    res = await agregarUsuario(email, '.');
                    resultado(null, res);
                });
        }
        console.log(res.getPayload())
    }))


}

// // Método para cambiar la clave de usuario
// Usuario.cambiarClave = (usuario, clave, resultado) => {
//     sql.query("CALL spActualizarClaveUsuario(?, ?);", 
//     [usuario, Bcrypt.hashSync(clave, 10)], (err, res) => {
//         //Verificar si hubo error ejecutando la consulta
//         if (err) {
//             console.log("Error actualizando clave:", err);
//             resultado(err, null);
//             return;
//         }
//         //La consulta no afectó registros
//         if (res.length == 0) {
//             console.log("Usuario no encontrado :", res[0]);
//             resultado({tipo : "No encontrado"}, null);
//             return;
//         }

//         console.log("Clave actualizada", { usuario });
//         resultado(null, {usuario});
//     });
// }

// function obtenerClave(usuario){
//     return new Promise((resolve, reject) => {
//         sql.query(`SELECT Clave FROM Usuario WHERE Usuario='${usuario}';`,
//         (err, res) => {
//             // Verificar si hubo error ejecuntando la consulta
//             if(err) {
//                 return reject(err);
//             } else {
//                 // usuario no encontrado
//                 if(res.length == 0){
//                     resolve('');
//                 }
//                 // usuario encontrado 
//                 else {
//                     resolve(res[0].Clave);
//                 }
//             }
//         });
//     });
// }

// Metodo que valida las credenciales con encriptado
// Usuario.validarAcceso2 = async (usuario, clave, resultado) => {
//     // obtener la clave guardada
//     const claveGuardada = await obtenerClave(usuario);
//     // validar si hay clave guardada
//     if (claveGuardada){
//         // confrontar las claves
//         if(Bcrypt.compareSync(clave, claveGuardada)){
//             const data = JSON.stringify({
//                 mensaje: "Credenciales válidas"
//             });

//             resultado(null, data);
//         }
//         else {
//             resultado({tipo: "Credenciales no válidas"}, null);
//             console.log("Credenciales no válidas");
//         }

//     } else {
//         // Agrega usuario nuevo
//         res = await agregarUsuario(usuario, clave);
//         resultado(null, res);
//     }

// }
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
            // Agrega usuario nuevo
            agregarUsuario(usuario, clave)
                .then((usuarioNuevo) => {
                    res = usuarioNuevo;
                    resultado(null, res);
                    return;
                })
                .catch((error) => {

                    resultado({ tipo: "No encontrado" }, null);
                    console.log(`Error: ${error}`);

                });

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