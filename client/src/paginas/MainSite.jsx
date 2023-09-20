import Publicacion from "../componentes/Publicacion";
import DefaultLayout from "../layouts/DefaultLayout";

export default function MainSite(props) {
  return (
    <DefaultLayout>
      <div className="row">
        <div className="col-sm-9 col-md-9 col-xl-6 mx-auto">
          <div>
            <h3>Bienvenido #nombre_usuario#</h3>
            <div className="d-flex gap-3" style={{ maxWidth: "600px" }}>
              <p style={{ transform: "translateY(5px)" }}>
                Buscar Usuario por Registro:
              </p>
              <input
                className="form-control flex-grow-1"
                style={{ width: "unset" }}
                type="text"
              />
              <button className="btn btn-primary">Ir a su perfil</button>
            </div>
          </div>

          <hr className="my-4" />

          <h3>Crear mi publicación:</h3>
          <div className="card">
            <div className="card-body">
              <div>
                <div>
                  <b>Tipo de publicación: </b>
                  <select
                    className="p-1 border rounded"
                    style={{ width: "150px" }}
                  >
                    <option value="">Curso</option>
                    <option value="">Catedrático</option>
                  </select>
                </div>
                <div className="mt-3">
                  <b>Curso: </b>
                  <select
                    className="p-1 border rounded"
                    style={{ width: "200px" }}
                  >
                    <option value="">#curso1#</option>
                    <option value="">#curso2#</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <b>Contenido:</b>
                <textarea className="form-control mt-2" rows="5"></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn mt-3 px-5 py-2 btn-primary">
                  Publicar
                </button>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <h3>Todas las publicaciones</h3>
          <div>
            <label htmlFor="nombre-curso">
              Buscar por nombre de curso o catedrático:
            </label>
            <input
              id="nombre-curso"
              className="form-control mt-2"
              type="text"
              style={{width: "300px"}}
            />
          </div>
          <h5 className="my-4">Ordenar por:</h5>
          <div className="row">
            <div className="col">
              <input
                type="radio"
                id="ninguno"
                name="ordenar-por-curso-o-catedratico"
                checked
              />
              <label htmlFor="ninguno">Ninguno</label>
            </div>
            <div className="col">
              <b>Por curso:</b>
              <div>
                <input
                  type="radio"
                  id="curso-asc"
                  name="ordenar-por-curso-o-catedratico"
                />
                <label htmlFor="curso-asc">Ascendente</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="curso-des"
                  name="ordenar-por-curso-o-catedratico"
                />
                <label htmlFor="curso-des">Descendente</label>
              </div>
            </div>
            <div className="col">
              <b>Por catedrático:</b>
              <div>
                <input
                  type="radio"
                  id="catedratico-asc"
                  name="ordenar-por-curso-o-catedratico"
                />
                <label htmlFor="catedratico-asc">Ascendente</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="catedratico-des"
                  name="ordenar-por-curso-o-catedratico"
                />
                <label htmlFor="catedratico-des">Descendente</label>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Publicacion />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
