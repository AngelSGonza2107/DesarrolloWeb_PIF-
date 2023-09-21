import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "../controladores/SignupValidation";
import DefaultLayout from "../layouts/DefaultLayout";

function Signup() {
  console.log("Signup component rendered");
  const [values, setValues] = useState({
    name: "",
    reg: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    // Enviar los datos del formulario al servidor Node.js
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Usuario registrado exitosamente");
        // Puedes redirigir al usuario a otra página después del registro si lo deseas
      } else {
        console.error("Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error de red: " + error.message);
    }
  };

  return (
    <DefaultLayout>
      <div className="auth-container">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <b>REGISTRO DE USUARIO</b>
                </div>
                <div className="card-body">
                  <div className="image">
                    <figure className="figure">
                      <img
                        src="https://portal.ingenieria.usac.edu.gt/images/logo_facultad/fiusac_negro.png"
                        className="figure-img img-fluid rounded"
                        alt="A"
                        width="400"
                      />
                    </figure>
                  </div>
                  <br />
                  <form action="" onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="usuario" className="form-label">
      Nombre Completo
    </label>
    <input
      type="text"
      className="form-control"
      id="autoSizingInputGroup"
      placeholder="Ingrese su nombre completo"
      name="name"
      onChange={handleInput}
    />
    {errors.name && (
      <span className="text-danger">{errors.name}</span>
    )}
  </div>
  <div className="mb-3">
    <label htmlFor="usuario" className="form-label">
      Correo Electrónico
    </label>
    <input
      type="email"
      className="form-control"
      id="autoSizingInputGroup"
      placeholder="Ingrese su correo electrónico institucional"
      name="email"
      onChange={handleInput}
    />
    {errors.email && (
      <span className="text-danger">{errors.email}</span>
    )}
  </div>
  <div className="mb-3">
    <label htmlFor="usuario" className="form-label">
      Registro Académico
    </label>
    <input
      type="text"
      className="form-control"
      id="autoSizingInputGroup"
      placeholder="Ingrese su registro académico"
      name="reg"
      onChange={handleInput}
    />
    {errors.reg && (
      <span className="text-danger">{errors.reg}</span>
    )}
  </div>
  <div className="mb-3">
    <label htmlFor="usuario" className="form-label">
      Contraseña
    </label>
    <input
      type="password"
      className="form-control"
      id="autoSizingInputGroup"
      placeholder="Ingrese una contraseña segura"
      name="password"
      onChange={handleInput}
    />
    {errors.password && (
      <span className="text-danger">{errors.password}</span>
    )}
  </div>
  <div className="button1">
  <button type="submit" className="btn btn-primary">
      Registrarse
    </button>
  </div>
  <br />
  <br />
  <br />
  <div className="button2">
    <Link to="/login" className="btn btn-default border">
      Iniciar Sesión
    </Link>
  </div>
</form>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </DefaultLayout>
  );
}

export default Signup;