//Cargar la libreria con la conexion a la bd
var sql = require('./bd');
const Usuario = require('./usuario.modelo');

//constructor
var Venta = function (venta) {
    this.id = venta.Id,
    this.idCliente = venta.IdCliente,
    this.nombreCliente = venta.NombreCliente,
    this.fecha = venta.Fecha,
    this.usuario = new Usuario ({
        Id: venta.IdUsuario,
        Nombre: venta.NombreUsuario,
        Usuario : '',
        Clave: '',
        IdRol: '',
        Activo: ''
    }),
    this.idProducto = venta.IdProducto,
    this.cantidad = venta.Cantidad
}

//Metodo que obtiene un registro basado en la clave primaria
Venta.obtener = (idVenta, resultado) => {
    sql.query(`SELECT * FROM Venta WHERE Id=${idVenta};`, (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando una venta:", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultados
        if (res.length) {
            console.log("Venta encontrada :", res[0]);
            resultado(null, res[0]);
            return;
        }
        //No se encontraron registros
        resultado({ tipo: "No encontrado" }, null);
    });
}

//Metodo que obtiene la lista de monedas
Venta.listar = (resultado) => {
    sql.query('CALL spListarVentas;', (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando lista de ventas:", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultados
        console.log("Lista de ventas encontradas :", res[0]);
        resultado(null, res[0]);
    });
}

//Metodo que obtiene un registro basado en la clave primaria
Venta.actualizar = (venta, resultado) => {
    sql.query('CALL spActualizarVenta(?, ?, ?, ?, ?, ?, ?);', //consulta sql
        [venta.id, venta.idCliente, venta.nombreCliente, venta.fecha, venta.usuario.id, venta.idProducto, venta.cantidad], //parametros
        (err, res) => {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                console.log("Error actualizando venta:", err);
                resultado(err, null);
                return;
            }
            //La consulta no afectó registros
            if (res.affectedRows == 0) {
                //No se encontraron registros
                resultado({ tipo: "No encontrado" }, null);
                return;
            }

            console.log("Venta actualizada :", venta);
            resultado(null, { venta });

        });
}

//Metodo que elimina un registro 
Venta.eliminar = (idVenta, resultado) => {
    sql.query('DELETE FROM Venta WHERE Id = ?', idVenta, (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error eliminando la venta:", err);
            resultado(err, null);
            return;
        }
        //La consulta no afectó registros
        if (res.affectedRows == 0) {
            //No se encontraron registros
            resultado({ tipo: "No encontrado" }, null);
            return;
        }

        console.log("Venta eliminida con id :", idVenta);
        resultado(null, res);
    });
}

//Metodo que obtiene un registro basado en la clave primaria
Venta.buscar = (tipo, dato, resultado) => {
    sql.query('CALL spBuscarVentas(?,?);', //consulta sql
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

module.exports = Venta;