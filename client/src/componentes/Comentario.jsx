import { Link } from "react-router-dom";

export default function Comentario(props) {
  return (
    <div className="p-2 border bg-white rounded" style={{}}>
      <b>por <Link to={`/usuario/${props.autorRegistro}`}>{props.autorEmail}:</Link></b>
      <p>
        {props.contenido}
      </p>
    </div>
  );
}
