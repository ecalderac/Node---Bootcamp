const express = require('express');
const router = express.Router();

//Imprtar el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function() {

    //Ruta Home
    router.get('/', proyectosController.protectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);

    return router;

}