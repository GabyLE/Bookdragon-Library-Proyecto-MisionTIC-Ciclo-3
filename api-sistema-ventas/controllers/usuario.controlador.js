// Cargar el modelo de las monedas
var Usuario = require('../models/usuario.modelo');

//Metodo web para validar credenciales de un usuario
exports.validarAcceso = (req, res) => {
    //validar que la solicitud tenga datos
    if (!req.body) {
        res.status(400).send({ message: 'El contenido del mensaje debe tener las credenciales de acceso' });
    }

    Usuario.validarAcceso(req.body.Usuario, req.body.Clave, (err, data) => {
        //Verificar si hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: 'Credenciales no válidas' });
            }
            else {
                res.status(500).send({ message: 'Error validando credenciales de acceso' });
            }
        }
        else {
            //Se devuelve los registros obtenidos
            res.send(data[0]);
        }
    });
}

// Metodo web para obtener la lista de usuarios
exports.listar = (req, res) => {
    Usuario.listar((err, data) => {
        // verificar si hubo error
        if (err) {
            res.status(500).send({message: "Error obteniendo lista de usuarios"});
        }
        else {
            // Se devuelve los registros obtenidos
            res.header('Access-Control-Allow-Origin', '*');
            res.send(data);
        }
    });
}

// Metodo para actualizar una moneda
exports.actualizar = (req, res) => {
    // validar que la solicitud tenga datos
    if(!req.body) {
        res.status(400).send({message: 'El contenido del mensaje debe tener información'});
    }

    Usuario.actualizar(req.body, (err,data) => {
        // Verificar si hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({message: 'No se actualizó ningun usuario'});
            }
            else {
                res.status(500).send({message: 'Error actualizando usuario'});
            }
        }
        else {
            // se devuelve el registro actualizado
            res.header('Access-Control-Allow-Origin', '*');
            res.send(data);
        }
    });
}

//Metodo web para eliminar un registro
exports.eliminar = (req, res) => {
    Usuario.eliminar(req.params.id,
        (err, data) => {
            //Verificar si hubo error
            if (err) {
                if (err.tipo == "No encontrado") {
                    res.status(404).send({ message: `No se econtró el usuario con id:${req.params.id}` });
                }
                else {
                    res.status(500).send({ message: 'Error eliminando el usuario' });
                }
            }
            else {
                //Se devuelve el registro actualizado
                res.header('Access-Control-Allow-Origin', '*');
                res.send({ message: `El usuario con id:${req.params.id} fue eliminada` });
            }
        });
}