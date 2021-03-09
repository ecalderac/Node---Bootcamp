import React, { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import clienteAxios from "../../config/axios";

function EditarCliente(props) {
  //Obtener el ID
  const { id } = props.match.params;
  //console.log(id);

  //cliente = state, datosCliente = funcion para guardar el state
  const [cliente, datosCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  //Query a la API
  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
    console.log(clienteConsulta.data);

    //colocar en el useState
    datosCliente(clienteConsulta.data);
  };

  //useEffect cuando el componente carga
  useEffect(() => {
    consultarAPI();
  }, []);

  //leer los datos del formulario
  const actualizarState = (e) => {
    //console.log(e.target.value);
    //Almacenar lo que el usuario escribe en el useState
    datosCliente({
      //Obtener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value,
    });
    //console.log(cliente);
  };

  //Envia una peticion por axios para actualizar el clientes
  const actualizarCliente = (e) => {
    e.preventDefault();

    //Enviar peticion por axios
    clienteAxios.put(`/clientes/${cliente._id}`, cliente).then((res) => {
      if (res.data.code === 11000) {
        //console.log("Error duplicado de Mongo");
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "No se ha actualizado el cliente",
        });
      } else {
        Swal.fire("Correcto!", "Se actualizo correctamente", "success");
      }

      //Redireccionar
      props.history.push("/");
    });
  };

  //Validar el formulario
  const validarCliente = () => {
    const { nombre, apellido, email, empresa, telefono } = cliente;

    //Revisar que las propiedades del state tengan contenido
    let valido =
      !nombre.length ||
      !apellido.length ||
      !email.length ||
      !empresa.length ||
      !telefono.length;

    //return true o false
    return valido;
  };

  return (
    <Fragment>
      <h2>Editar Cliente</h2>
      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
            value={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
            value={cliente.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
            value={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="number"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
            value={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}

//HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);
