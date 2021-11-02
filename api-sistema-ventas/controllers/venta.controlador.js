//Cargar el modelo de las monedas
var Venta = require('../models/venta.modelo');

//Metodo web para obtener una moneda
exports.obtener = (req, res) => {
    Venta.obtener(req.params.id, (err, data) => {
        //Verificar si hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: `No se encontró venta con el id ${req.params.id}` });
            }
            else {
                res.status(500).send({ message: `Error obteniendo la venta con el id ${req.params.id}` });
            }
        }
        else {
            //Se devuelve el registro obtenido
            res.header('Access-Control-Allow-Origin', '*');
            res.send(data);
        }
    });
}

//Metodo web para obtener la lista de ventas
exports.listar = (req, res) => {
    Venta.listar((err, data) => {
        //Verificar si hubo error
        if (err) {
            res.status(500).send({ message: 'Error obteniendo la lista de ventas' });
        }
        else {
            //Se devuelve los registros obtenidos
            res.header('Access-Control-Allow-Origin', '*');
            res.send(data);
        }
    });
}

//Metodo web para actualizar una venta
exports.actualizar = (req, res) => {
    //validar que la solicitud tenga datos
    if (!req.body) {
        res.status(400).send({ message: 'El contenido del mensaje debe tener información con la venta' });
    }

    Venta.actualizar(new Venta(req.body),
        (err, data) => {
            
            //Verificar si hubo error
            if (err) {
                if (err.tipo == "No encontrado") {
                    res.status(404).send({ message: 'No se actualizó ninguna venta' });
                }
                else {
                    res.status(500).send({ message: 'Error actualizando la venta' });
                }
            }
            else {
                //Se devuelve el registro actualizado
                res.header('Access-Control-Allow-Origin', '*');
                res.send(data);
            }
            console.log(data);
        });
}

//Metodo web para actualizar una venta
exports.buscar = (req, res) => {
    //validar que la solicitud tenga datos
    if (!req.body) {
        res.status(400).send({ message: 'El contenido del mensaje debe tener información con el dato a buscar' });
    }

    Venta.buscar(req.params.tipo, req.body, (err, data) => {
            //Verificar si hubo error
            if (err) {
                if (err.tipo == "No encontrado") {
                    res.status(404).send({ message: 'No se realizó ninguna búsqueda' });
                }
                else {
                    res.status(500).send({ message: 'Error realizando búsqueda' });
                }
            }
            else {
                //Se devuelve el registro actualizado
                res.header('Access-Control-Allow-Origin', '*');
                res.send(data);
            }
        });
}

//Metodo web para eliminar una venta
exports.eliminar = (req, res) => {
    Venta.eliminar(req.params.id,
        (err, data) => {
            //Verificar si hubo error
            if (err) {
                if (err.tipo == "No encontrado") {
                    res.status(404).send({ message: `No se econtró la venta con id:${req.params.id}` });
                }
                else {
                    res.status(500).send({ message: 'Error eliminando la venta ' });
                }
            }
            else {
                //Se devuelve el registro actualizado
                res.header('Access-Control-Allow-Origin', '*');
                res.send({ message: `La venta con id:${req.params.id} fue eliminada` });
            }
        });
}