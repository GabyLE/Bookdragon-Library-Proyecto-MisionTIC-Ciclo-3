// Cargar la libreria con la conexion a la bd
let sql = require('./bd');

// constructor 
let Usuario = function(usuario) {
    this.id = usuario.Id;
    this.usuario = usuario.Usuario;
    this.nombre = usuario.Nombre;
    this.clave = usuario.Clave;
    this.idRol = usuario.IdRol;
    this.activo = usuario.Activo;
}

//Metodo que valida las credenciales de un usuario
Usuario.validarAcceso = (usuario, clave, resultado) => {
    sql.query("CALL spValidarAccesoUsuario( ?, ?);",
        [usuario, clave], (err, res) => {
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
            //No se encontraron registros
            resultado({ tipo: "No encontrado" }, null);
            console.log("Credenciales no válidas");
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
    sql.query('CALL spActualizarUsuario(?,?,?);',
    [usuario.Id, usuario.Rol, usuario.Activo],
    (err, res) => {
        // verificar si hubo error ejectutando la consulta
        if (err) {
            console.log("Error actualizando moneda:", err);
            resultado(err, null);
            return;
        }
        // La consulta no efectó registros
        if (res.affectedRows == 0) {
            // No se encontraron registros
            resultado({tipo: "No encontrado"}, null);
            return;
        }

        console.log("Usuario actualizado: ", usuario);
        resultado(null, {usuario});
    }
    );
    
}

// Metodo que agrega un registro
Usuario.agregar = (usuario, resultado) => {
    sql.query('CALL spActualizarUsuario(?,?,?,?,?);',
    [usuario.Id, usuario.Usuario, usuario.Nombre, usuario.Clave, usuario.Rol],
    (err, res) => {
        // verificar si hubo error ejectutando la consulta
        if (err) {
            console.log("Error actualizando moneda:", err);
            resultado(err, null);
            return;
        }
        // La consulta no efectó registros
        if (res.affectedRows == 0) {
            // No se encontraron registros
            resultado({tipo: "No encontrado"}, null);
            return;
        }

        console.log("Usuario actualizado: ", usuario);
        resultado(null, {usuario});
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
            resultado({tipo	: "No encontrado"}, null);
            return;
        }
        console.log("Usuario eliminado con id: ", idUsuario);
        resultado(null, res);
    });
}


module.exports = Usuario;