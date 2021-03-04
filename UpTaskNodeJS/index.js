const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

//crea una app de express
const app = express();

//Donde cargar archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug');

//Añadir carpeta de vistas
app.set('views', path.join(__dirname, './views'));

//Habilitar Body Parser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes());

app.listen(3000);