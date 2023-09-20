import Comentario from "./Comentario";

export default function Publicacion() {
  return (
    <div className="card">
      <div className="card-header">
        tipo: <b>Curso</b>
      </div>
      <div className="card-body d-flex flex-column gap-1">
        <div className="text-body-secondary fst-italic">Fecha: 29/09/2019</div>
        <span>
          por: <b>UserName</b>
        </span>
        <span
          className="badge bg-secondary fs-6"
          style={{ width: "fit-content" }}
        >
          curso: <b>Matemática</b>
        </span>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
          voluptatibus eius distinctio tenetur reiciendis optio officia facilis
          dolore maxime, nemo tempora eum similique? Exercitationem nam et sint
          temporibus distinctio doloremque.
        </div>
      </div>
      <div className="card-footer">
        <h5>Comentarios:</h5>
        <Comentario />
      </div>
    </div>
  );
}
