module.exports = (app) => {
    var usuarios = require('../controllers/usuario.controlador');

    // metodo que obtine la lista de usuarios
    app.get("/usuarios", usuarios.listar);

    // metodo que actualiza un usuario
    app.post("/usuarios", usuarios.actualizar);

    // metodo que eliminia un usuario
    app.delete("/usuarios/:id", usuarios.eliminar);

    // //metodo que cambia la clave de un usuario
    // app.post("/usuarios/cambiarclave", usuarios.cambiarClave);

    //metodo que valida las credenciales de un usuario
    app.post("/usuarios/validaracceso", usuarios.validarAcceso);

    //ingresar con las credenciales de google
    app.post("/usuarios/auth/google", usuarios.googleLogin);
}