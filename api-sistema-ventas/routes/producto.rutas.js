module.exports = (app) => {
    var productos = require('../controllers/producto.controlador');

    //metodo que obtiene una moneda
    app.get("/productos/:id", productos.obtener);

    //metodo que obtiene la lista deproductos
    app.get("/productos",productos.listar);

    //metodo que actualiza (INSERT - UPDATE) un producto
    app.post("/productos",productos.actualizar);

    //metodo que busca una venta
    app.post("/productos/:tipo",productos.buscar);

    //metodo que elimina un producto
    app.delete("/productos/:id",productos.eliminar);

}