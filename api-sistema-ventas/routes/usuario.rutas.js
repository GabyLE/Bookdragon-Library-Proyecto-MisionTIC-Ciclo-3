module.exports = (app) => {
    var usuarios = require('../controllers/usuario.controlador');

    // metodo que obtine la lista de usuarios
    app.get("/usuarios", usuarios.listar);

    // metodo que actualiza un usuario
    app.post("/usuarios", usuarios.actualizar);

    // metodo que eliminia un usuario
    app.delete("/usuarios/:id", usuarios.eliminar);

     //metodo que valida las credenciales de un usuario
     app.post("/usuarios/validaracceso", usuarios.validarAcceso);
}