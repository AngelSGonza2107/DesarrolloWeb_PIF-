import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(props) {
  // Esta variable está en varias páginas y componentes
  // Cambiale el valor de true a false o viceversa y mira los cambios que ocurren en la página
  // Esta variable simula el estado si hay una sesión iniciada
  const [sesionIniciada, setSesionIniciada] = useState(true);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <div>
          <Link to="/" className="navbar-brand fs-4">
            Taller4Grupo5
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="collapse flex-grow-0 navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <NavLink to="/" className="nav-link">
              Inicio
            </NavLink>
            {sesionIniciada ? (
              <>
                <NavLink to="/usuario/mi-perfil" className="nav-link">
                  Mi Perfil
                </NavLink>
                <NavLink to="/cerrar-sesion" className="nav-link">
                  {/* No existe esta ruta: hay que crearla */}
                  Cerrar Sesión
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">
                  Iniciar Sesión
                </NavLink>
                <NavLink to="/signup" className="nav-link">
                  Registrarse
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
