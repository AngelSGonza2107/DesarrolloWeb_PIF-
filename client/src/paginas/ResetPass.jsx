import React, { useState } from "react";
import Validation from "../controladores/ResetPassValidation";
import DefaultLayout from "../layouts/DefaultLayout";

function ResetPass() {
  const [values, setValues] = useState({
    email: "",
    reg: "",
    newPassword: "", // Agregar campo para la nueva contraseña
  });
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // Cambiar a event.target.value
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    // Aquí puedes enviar la solicitud para actualizar la contraseña
    updatePassword();
  };

  // Función para enviar la solicitud de actualización de contraseña
  const updatePassword = async () => {
    // Enviar los datos de actualización de contraseña al servidor
    try {
      const response = await fetch("http://localhost:8000/updatepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Contraseña actualizada con éxito
        console.log("Contraseña actualizada con éxito");
        window.location.replace("/login");
      } else {
        // Error en la actualización de contraseña
        const data = await response.json();
        console.error("Error al actualizar la contraseña: " + data.error);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor: " + error.message);
    }
  };

  return (
    <DefaultLayout>
      {/* ... (código anterior) */}
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="registro" className="form-label">
            Registro Académico
          </label>
          <input
            type="text"
            className="form-control"
            id="registro"
            placeholder="Ingrese su registro académico registrado"
            name="reg"
            onChange={handleInput}
          />
          {errors.reg && <span className="text-danger">{errors.reg}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Ingrese su correo electrónico registrado"
            name="email"
            onChange={handleInput}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Nueva Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            placeholder="Ingrese su nueva contraseña"
            name="newPassword"
            onChange={handleInput}
          />
          {errors.newPassword && (
            <span className="text-danger">{errors.newPassword}</span>
          )}
        </div>
        <div className="button1">
          <button type="submit" className="btn btn-primary">
            Reiniciar Contraseña
          </button>
        </div>
        {/* ... (código posterior) */}
      </form>
    </DefaultLayout>
  );
}

export default ResetPass;