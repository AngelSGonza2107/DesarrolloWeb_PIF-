import React, { useState } from "react";
import "../assets/Login.css";
import { Link } from "react-router-dom";
import Validation from "../controladores/LoginValidation";
import DefaultLayout from "../layouts/DefaultLayout";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  };

  return (
    <DefaultLayout>
      <div className="Login">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <b>INICIO DE SESION</b>
                </div>
                <div class="card-body">
                  <div class="image">
                    <figure class="figure">
                      <img
                        src="https://portal.ingenieria.usac.edu.gt/images/logo_facultad/fiusac_negro.png"
                        class="figure-img img-fluid rounded"
                        alt="A"
                        width="400"
                      />
                    </figure>
                  </div>
                  <br />
                  <form action="" onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <label for="usuario" class="form-label">
                        Usuario
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="autoSizingInputGroup"
                        placeholder="Ingrese su correo electrónico"
                        onChange={handleInput}
                        name="email"
                      />
                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>
                    <div class="mb-3">
                      <label for="contraseña" class="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="contraseña"
                        placeholder="Ingrese su contraseña"
                        onChange={handleInput}
                        name="password"
                      />
                      {errors.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                    </div>
                    <br />
                    <div class="button1">
                      <button type="submit" class="btn btn-primary">
                        Iniciar Sesión
                      </button>
                      <br />
                      <br />
                      <Link to="/resetpass" type="button" class="btn">
                        ¿Olvidó su contraseña?
                      </Link>
                    </div>
                    <br />
                    <br />
                    <div class="button2">
                      <Link to="/signup" class="btn btn-default border">
                        Registrarse
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

export default Login;
