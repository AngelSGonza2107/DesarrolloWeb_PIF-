import { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { useParams } from "react-router-dom";

export default function Usuario() {
  const { registro } = useParams();
  const [sesionIniciada, setSesionIniciada] = useState(true);
  const [isEditNombreCompleto, setIsEditNombreCompleto] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditContrasena, setIsEditContrasena] = useState(false);
  const [tabActual, setTabActual] = useState("CursosAprobados");

  const handleButtonEditNombreCompletoClick = (valor) => {
    setIsEditNombreCompleto(valor);
  };

  const handleButtonEditEmailClick = (valor) => {
    setIsEditEmail(valor);
  };

  const handleButtonEditContrasenaClick = (valor) => {
    setIsEditContrasena(valor);
  };

  /* Estos datos obviamente son falsos, sustituirlos con los datos el usuario que inicio sesion u el usuario
    que se obtiene al buscar en la base de datos con el registro de la URL (pruebe en el navegador la
    ruta /users/{registro}, donde registro es el RegistroAcademico de cualquier usuario, y luego investigue en un 
    useEffect que se encuentra en la variable registro (la cual se encuentra en la linea 6 de este codigo)

    De preferencia solo hay que tener un solo objeto de datos independientemente si es Mi Perfil, o si es de otro usuario
    , es decir, datosUsuarioQueInicioSesion y datosDeOtroUsuario se conviertan en solo uno y que de ahí se impriman los datos
  */

  // Suponiendo que hay una sesión iniciada
  const datosUsuarioQueInicioSesion = {
    nombreCompleto: "Mi Propio Usuario",
    email: "miusuario@gmail.com",
    registroAcademico: "202212345",
    contrasena: "contrasenademipropiousuario",
  };

  const datosDeOtroUsuario = {
    nombreCompleto: "Otro Usuario",
    email: "otrousuario@gmail.com",
    registroAcademico: "202254321",
    contrasena: "contrasenadeotrousuario",
  };

  return (
    <DefaultLayout>
      <div className="col-8">
        <h1>
          {sesionIniciada && registro === "mi-perfil"
            ? "Mi Perfil"
            : datosDeOtroUsuario.email}
        </h1>

        <div>
          <div className="d-flex flex-column">
            <b>Créditos:</b>
            <div className="d-flex gap-3 mt-2 align-items-center">999</div>
          </div>
          <div className="d-flex flex-column mt-3">
            <b>Nombre completo:</b>
            <div className="d-flex gap-3 mt-2 align-items-center">
              {sesionIniciada ? (
                <>
                  {isEditNombreCompleto ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: "200px" }}
                        defaultValue={
                          datosUsuarioQueInicioSesion.nombreCompleto
                        }
                      />
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button type="button" className="btn btn-warning">
                          Actualizar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleButtonEditNombreCompletoClick(false)
                          }
                          className="btn btn-secondary"
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p style={{ transform: "translateY(5px)" }}>
                        {datosUsuarioQueInicioSesion.nombreCompleto}
                      </p>
                      <button
                        onClick={() =>
                          handleButtonEditNombreCompletoClick(true)
                        }
                        className="btn btn-primary"
                      >
                        Editar
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p style={{ transform: "translateY(5px)" }}>
                    {datosDeOtroUsuario.nombreCompleto}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <b>Correo electrónico:</b>
            <div className="d-flex gap-3 mt-2 align-items-center">
              {sesionIniciada ? (
                <>
                  {isEditEmail ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: "200px" }}
                        defaultValue={datosUsuarioQueInicioSesion.email}
                      />
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button type="button" className="btn btn-warning">
                          Actualizar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleButtonEditEmailClick(false)}
                          className="btn btn-secondary"
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p style={{ transform: "translateY(5px)" }}>
                        {datosUsuarioQueInicioSesion.email}
                      </p>
                      <button
                        onClick={() => handleButtonEditEmailClick(true)}
                        className="btn btn-primary"
                      >
                        Editar
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p style={{ transform: "translateY(5px)" }}>
                    {datosDeOtroUsuario.email}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <b>Registro Académico:</b>
            <div className="d-flex gap-3 mt-2 text-body-secondary align-items-center">
              {sesionIniciada ? (
                <p style={{ transform: "translateY(5px)" }}>
                  {datosUsuarioQueInicioSesion.registroAcademico}
                </p>
              ) : (
                <p style={{ transform: "translateY(5px)" }}>
                  {datosDeOtroUsuario.registroAcademico}
                </p>
              )}
            </div>
          </div>
          {sesionIniciada ? (
            <div className="d-flex flex-column mt-3">
              <b>Contraseña:</b>
              <div className="d-flex gap-3 mt-2 align-items-center">
                {sesionIniciada ? (
                  <>
                    {isEditContrasena ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          style={{ maxWidth: "200px" }}
                          defaultValue={datosUsuarioQueInicioSesion.contrasena}
                        />
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button type="button" className="btn btn-warning">
                            Actualizar
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleButtonEditContrasenaClick(false)
                            }
                            className="btn btn-secondary"
                          >
                            Cancelar
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p style={{ transform: "translateY(5px)" }}>
                          {datosUsuarioQueInicioSesion.contrasena}
                        </p>
                        <button
                          onClick={() => handleButtonEditContrasenaClick(true)}
                          className="btn btn-primary"
                        >
                          Editar
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p style={{ transform: "translateY(5px)" }}>
                      {datosDeOtroUsuario.contrasena}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <h2 className="mt-5">Cursos</h2>
        {sesionIniciada && registro === "mi-perfil" ? (
          <div>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  onClick={() => setTabActual("CursosAprobados")}
                  className={
                    "nav-link " +
                    (tabActual === "CursosAprobados" ? "active" : "")
                  }
                >
                  Cursos Aprobados
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setTabActual("TodosLosCursos")}
                  className={
                    "nav-link " +
                    (tabActual === "TodosLosCursos" ? "active" : "")
                  }
                >
                  Todos los cursos
                </button>
              </li>
            </ul>
            {tabActual === "CursosAprobados" ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Curso</th>
                    <th scope="col">Créditos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Matemática Básica 1</td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>Física 1</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Física 2</td>
                    <td>3</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Curso</th>
                    <th scope="col">Créditos</th>
                    <th scope="col">Botón aprobar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Matemática Básica 1</td>
                    <td>23</td>
                    <td className="text-center"><button className="btn btn-secondary">Desaprobar</button></td>
                  </tr>
                  <tr>
                    <td>Física 1</td>
                    <td>2</td>
                    <td className="text-center"><button className="btn btn-secondary">Desaprobar</button></td>
                  </tr>
                  <tr>
                    <td>Física 2</td>
                    <td>3</td>
                    <td className="text-center"><button className="btn btn-secondary">Desaprobar</button></td>
                  </tr>
                  <tr>
                    <td>Estadística 1</td>
                    <td>5</td>
                    <td className="text-center"><button className="btn btn-success">Aprobar</button></td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Curso</th>
                <th scope="col">Créditos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Matemática Básica 1</td>
                <td>23</td>
              </tr>
              <tr>
                <td>Física 1</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Física 2</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </DefaultLayout>
  );
}
