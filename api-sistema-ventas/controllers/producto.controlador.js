//Cargar el modelo de las monedas
var Producto = require('../models/producto.modelo');

//Metodo web para obtener una moneda
exports.obtener = (req, res) => {
    Producto.obtener(req.params.id, (err, data) => {
        //Verificar si hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: `No se encontró producto con el id ${req.params.id}` });
            }
            else {
                res.status(500).send({ message: `Error obteniendo el producto con el id ${req.params.id}` });
            }
        }
        else {
            //Se devuelve el registro obtenido
            res.header('Access-Control-Allow-Origin', '*');
            res.send(data);
        }
    });
}

//Metodo web para obtener la lista de productos
exports.listar = (req, res) => {
    Producto.listar((err, data) => {
        //Verificar si hubo error
        if (err) {
            res.status(500).send({ message: 'Error obteniendo la lista de productos' });
        }
        else {
            //Se devuelve los registros obtenidos
            res.header('Access-Control-Allow-Origin', '*');
            res.send(data);
        }
    });
}

//Metodo web para actualizar una producto
exports.actualizar = (req, res) => {
    //validar que la solicitud tenga datos
    if (!req.body) {
        res.status(400).send({ message: 'El contenido del mensaje debe tener información con el producto' });
    }

    Producto.actualizar(new Producto(req.body),
        (err, data) => {
            
            //Verificar si hubo error
            if (err) {
                if (err.tipo == "No encontrado") {
                    res.status(404).send({ message: 'No se actualizó ningun producto' });
                }
                else {
                    res.status(500).send({ message: 'Error actualizando el producto' });
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

//Metodo web para buscar productos
exports.buscar = (req, res) => {
    //validar que la solicitud tenga datos
    if (!req.body) {
        res.status(400).send({ message: 'El contenido del mensaje debe tener información con el dato a buscar' });
    }

    Producto.buscar(req.params.tipo, req.body, (err, data) => {
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

//Metodo web para eliminar un producto
exports.eliminar = (req, res) => {
    Producto.eliminar(req.params.id,
        (err, data) => {
            //Verificar si hubo error
            if (err) {
                if (err.tipo == "No encontrado") {
                    res.status(404).send({ message: `No se econtró el producto con id:${req.params.id}` });
                }
                else {
                    res.status(500).send({ message: 'Error eliminando producto ' });
                }
            }
            else {
                //Se devuelve el registro actualizado
                res.header('Access-Control-Allow-Origin', '*');
                res.send({ message: `El producto con id:${req.params.id} fue eliminada` });
            }
        });
}