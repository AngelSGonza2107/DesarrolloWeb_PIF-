import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../controladores/LoginValidation";
import DefaultLayout from "../layouts/DefaultLayout";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // Corrige esto, elimina los corchetes
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    // Enviar los datos de inicio de sesión al servidor
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Inicio de sesión exitoso");

        // Redirige al usuario a la página "/main" después del inicio de sesión exitoso
        // y pasa las variables de sesión como estado
        navigate("/main", { state: { user: values.email } });

      } else {
        alert("Verifique sus datos");
      }
    } catch (error) {
      // Resto de tu código
    }
  };

  return (
    <DefaultLayout>
      <div className="auth-container">
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
                      <label htmlFor="usuario" class="form-label">
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
                      <label htmlFor="contraseña" class="form-label">
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
