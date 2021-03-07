import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import clienteAxios from "../../config/axios";

function NuevoCliente({ history }) {
  //cliente = state, guardarCliente = funcion para guardar el state
  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  //leer los datos del formulario
  const actualizarState = (e) => {
    //console.log(e.target.value);
    //Almacenar lo que el usuario escribe en el useState
    guardarCliente({
      //Obtener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value,
    });
    console.log(cliente);
  };

  //Añade en la REST API un cliente Nuevo
  const agregarCliente = (e) => {
    e.preventDefault();

    //Enviar peticion
    clienteAxios.post("/clientes", cliente).then((res) => {
      if (res.data.code === 11000) {
        //console.log("Error duplicado de Mongo");
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "Ese cliente ya esta registrado",
        });
      } else {
        console.log(res.data);
        Swal.fire("Cliente agregado!", res.data.mensaje, "success");
      }

      //Redireccionar
      history.push("/");
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
      <h2>Nuevo Cliente</h2>
      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="number"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}

//HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);
