import React, { useEffect, useState, Fragment } from "react";

//importar componentes
import Cliente from "./Cliente";

//importar cliente axios
import clienteAxios from "../../config/axios";

import { Link } from "react-router-dom";

function Clientes() {
  //Trabajar con el useState
  //clientes = state, guardarClientes = funcion para guardar el useState
  const [clientes, guardarClientes] = useState([]);

  //Query a la API
  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get("/clientes");
    //console.log(clientesConsulta.data);
    guardarClientes(clientesConsulta.data);
  };

  //use effect es similar a componentdidmount y willmount
  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </Fragment>
  );
}
export default Clientes;
