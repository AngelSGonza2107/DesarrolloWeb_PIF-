import { useState } from "react";
import Comentario from "./Comentario";
import { Link } from "react-router-dom";

export default function Publicacion(props) {
  // Esta variable está en varias páginas y componentes
  // Cambiale el valor de true a false o viceversa y mira los cambios que ocurren en la página
  // Esta variable simula el estado si hay una sesión iniciada
  const [sesionIniciada, setSesionIniciada] = useState(false);

  return (
    <div className="card">
      <div className="card-header">
        tipo: <b>{props.tipo}</b>
      </div>
      <div className="card-body d-flex flex-column gap-1">
        <div className="text-body-secondary fst-italic">Fecha: {props.fecha}</div>
        <span>
          por: <b><Link to={`/usuario/${props.autorRegistro}`}>{props.autorEmail}</Link></b>
        </span>
        <span
          className="badge bg-secondary fs-6"
          style={{ width: "fit-content" }}
        >
          {props.tipo}: <b>{props.tipoContenido}</b>
        </span>
        <div>
          {props.contenido}
        </div>
      </div>
      <div className="card-footer">
        <h5>Comentarios:</h5>
        {sesionIniciada ? (
          <div className="mb-3 d-flex flex-column row-gap-2">
            <b>Crear comentario:</b>
            <textarea
              placeholder="Escribe aquí tu comentario"
              className="form-control"
              rows="3"
              style={{ resize: "none", overflow: "auto" }}
            ></textarea>
            <button
              className="btn btn-primary"
              style={{ width: "fit-content" }}
            >
              Crear Comentario
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="d-flex flex-column row-gap-2">
          {props.comentarios.length === 0 ? "No hay comentarios" : props.comentarios.map(val => {
            return <Comentario 
              autorEmail={val.autorEmail}
              autorRegistro={val.autorRegistro}
              contenido={val.contenido}
            />
          })}
        </div>
      </div>
    </div>
  );
}
