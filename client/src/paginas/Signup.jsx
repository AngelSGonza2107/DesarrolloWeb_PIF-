import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "../controladores/SignupValidation";
import DefaultLayout from "../layouts/DefaultLayout";

function Signup() {
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
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  };

  return (
    <DefaultLayout>
      <div className="auth-container">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <b>REGISTRO DE USUARIO</b>
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
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="autoSizingInputGroup"
                        placeholder="Ingrese su nombre completo"
                        name="name"
                        onChange={handleInput}
                      />
                      {errors.name && (
                        <span className="text-danger">{errors.name}</span>
                      )}
                    </div>
                    <div class="mb-3">
                      <label for="usuario" class="form-label">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="autoSizingInputGroup"
                        placeholder="Ingrese su correo electrónico institucional"
                        name="email"
                        onChange={handleInput}
                      />
                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>
                    <div class="mb-3">
                      <label for="usuario" class="form-label">
                        Registro Académico
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="autoSizingInputGroup"
                        placeholder="Ingrese su registro académico"
                        name="reg"
                        onChange={handleInput}
                      />
                      {errors.reg && (
                        <span className="text-danger">{errors.reg}</span>
                      )}
                    </div>
                    <div class="mb-3">
                      <label for="usuario" class="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="autoSizingInputGroup"
                        placeholder="Ingrese una contraseña segura"
                        name="password"
                        onChange={handleInput}
                      />
                      {errors.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                    </div>
                    <br />
                    <div class="button1">
                      <button type="submit" class="btn btn-primary">
                        Registrarse
                      </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div class="button2">
                      <Link to="/" class="btn btn-default border">
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
