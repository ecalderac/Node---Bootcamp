const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu Cuenta'
    })
}

exports.crearNuevaCuenta = async(req, res) => {
    const usuario = req.body;

    const nuevoUsuario = await Usuarios.create(usuario);

    // todo : Flash Message y redireccionar

    console.log('Usuario creado', nuevoUsuario);
}