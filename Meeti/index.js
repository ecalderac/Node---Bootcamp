const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');

// Configuración y Modelos BD
const db = require('./config/db');
require('./models/Usuarios');
db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error));

// Variables de Desarrollo
require('dotenv').config({ path: 'variables.env' });

//Aplicacion principal
const app = express();

//Body parser, leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Habilitar EJS como template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Ubicacion vistas
app.set('views', path.join(__dirname, './views'));

//Archivos estaticos
app.use(express.static('public'));

//Middleware (usuario logueado, flash messages, fecha actrual)
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.years = fecha.getFullYear();
    next();
});

//Routing
app.use('/', router());

//Agrega el puerto
app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionando');
});