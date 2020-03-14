exports.protectosHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
}