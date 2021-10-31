//Cargar la libreria con la conexion a la bd
var sql = require('./bd');

//constructor
var Producto = function (producto) {
    this.id = producto.Id,
    this.nombre = producto.Nombre,
    this.valorUnitario = producto.ValorUnitario,
    this.estado = producto.Estado
}

//Metodo que obtiene un registro basado en la clave primaria
Producto.obtener = (idProducto, resultado) => {
    sql.query(`SELECT * FROM vProducto WHERE Id=${idProducto};`, (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando un producto:", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultados
        if (res.length) {
            console.log("Producto encontrada :", res[0]);
            resultado(null, res[0]);
            return;
        }
        //No se encontraron registros
        resultado({ tipo: "No encontrado" }, null);
    });
}

//Metodo que obtiene la lista de productos
Producto.listar = (resultado) => {
    sql.query('CALL spListarProductos;', (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando lista de productos:", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultados
        console.log("Lista de productos encontradas :", res[0]);
        resultado(null, res[0]);
    });
}

//Metodo que obtiene un registro basado en la clave primaria
Producto.actualizar = (producto, resultado) => {
    sql.query('CALL spActualizarProducto(?, ?, ?, ?);', //consulta sql
        [producto.id, producto.nombre, producto.valorUnitario, producto.estado], //parametros
        (err, res) => {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                console.log("Error actualizando producto:", err);
                resultado(err, null);
                return;
            }
            //La consulta no afectó registros
            if (res.affectedRows == 0) {
                //No se encontraron registros
                resultado({ tipo: "No encontrado" }, null);
                return;
            }

            console.log("producto actualizado :", producto);
            resultado(null, { producto });

        });
}

//Metodo que elimina un registro 
Producto.eliminar = (idProducto, resultado) => {
    sql.query('DELETE FROM Producto WHERE Id = ?', idProducto, (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error eliminando el producto:", err);
            resultado(err, null);
            return;
        }
        //La consulta no afectó registros
        if (res.affectedRows == 0) {
            //No se encontraron registros
            resultado({ tipo: "No encontrado" }, null);
            return;
        }

        console.log("Producto eliminado con id :", idProducto);
        resultado(null, res);
    });
}

//Metodo que obtiene un registro basado en la clave primaria
Producto.buscar = (tipo, dato, resultado) => {
    sql.query('CALL spBuscarProductos(?,?);', //consulta sql
        [dato.Dato, tipo], //parametros
        (err, res) => {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                console.log("Error realizando busqueda:", err);
                resultado(err, null);
                return;
            }
            //La consulta no afectó registros
            if (res.affectedRows == 0) {
                //No se encontraron registros
                resultado({ tipo: "No encontrado" }, null);
                return;
            }

            console.log("Resultado busqueda :", res[0]);
            resultado(null, res[0] );

        });
}

module.exports = Producto;