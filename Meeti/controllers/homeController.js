exports.home = (req, res) => {
    res.render('home', {
            nombrePagina: 'Inicio'
        }) //se coloca render y el nombre de la vista para mostrar
};