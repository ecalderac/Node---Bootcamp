import React, { Fragment } from "react";

//Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/***Layout */
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

/***Clientes */
import Clientes from "./components/clientes/Clientes";
import Productos from "./components/productos/Productos";
import Pedidos from "./components/pedidos/Pedidos";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div class="grid contenedor contenido-principal">
          <Navegacion />
          <main class="caja-contenido col-9">
            {/*todo routing a los diferentes componentes*/}
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/pedidos" component={Pedidos} />
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
