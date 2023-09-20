import { Link, NavLink } from "react-router-dom";

export default function Navbar(props) {
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
        <div className="collapse flex-grow-0 navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink exact to="/" activeClassname="active" className="nav-link">
              Inicio
            </NavLink>
            <NavLink to="/login" activeClassname="active" className="nav-link">
              Iniciar Sesión
            </NavLink>
            <NavLink to="/signup" activeClassname="active" className="nav-link">
              Registrarse
            </NavLink>
            <NavLink to="/usuario/mi-perfil" activeClassname="active" className="nav-link">
              Mi Perfil
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
