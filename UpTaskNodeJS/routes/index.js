const express = require('express');
const router = express.Router();

module.exports = function() {

    //Ruta Home
    router.get('/', (req, res) => {
        res.send("Index");
    });

    router.get('/nosotros', (req, res) => {
        res.send("Nosotros");
    });

    return router;

}