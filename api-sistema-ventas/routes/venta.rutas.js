module.exports = (app) => {
    var ventas = require('../controllers/venta.controlador');

    //metodo que obtiene una moneda
    app.get("/ventas/:id", ventas.obtener);

    //metodo que obtiene la lista de ventas
    app.get("/ventas", ventas.listar);

    //metodo que actualiza (INSERT - UPDATE) una moneda
    app.post("/ventas", ventas.actualizar);

    //metodo que busca una venta
    app.post("/ventas/:tipo", ventas.buscar);

    //metodo que elimina una moneda
    app.delete("/ventas/:id", ventas.eliminar);

}