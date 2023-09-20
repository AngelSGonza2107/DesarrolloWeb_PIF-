import DefaultLayout from "../layouts/DefaultLayout";

export default function MainSite(props) {
  return (
    <DefaultLayout>
      <div className="row">
        <div className="col-8">
          <h3>Bienvenido #nombre_usuario#</h3>
          <div>
            Buscar Usuario por Registro: <input type="text" />
            <button>Ir a su perfil</button>
          </div>
          <h2>Publicaciones</h2>

          <h3>Crear mi publicación:</h3>
          <div className="card">
            <div className="card-body">
              <div>
                <div>
                  <b>Tipo de publicación</b>
                  <select>
                    <option value="">Curso</option>
                    <option value="">Catedrático</option>
                  </select>
                </div>
                <div>
                  <b>Curso:</b>
                  <select>
                    <option value="">#curso1#</option>
                    <option value="">#curso2#</option>
                  </select>
                </div>
              </div>
              <div>
                <b>Contenido:</b>
                <textarea className="form-control" rows="10"></textarea>
              </div>
              <div>
                <button className="btn btn-primary">Publicar</button>
              </div>
            </div>
          </div>

          <label htmlFor="nombre-curso">Buscar por nombre de curso</label>
          <input id="nombre-curso" className="form-control" type="text" />
          <label htmlFor="nombre-catedratico">
            Buscar por nombre de catedrático
          </label>
          <input type="text" className="form-control" id="nombre-catedratico" />

          <div className="card">
            <div className="card-header">
              tipo: <b>Curso</b>
            </div>
            <div className="card-body">
              <span>
                por: <b>UserName</b>
              </span>
              <span class="badge bg-secondary fs-6">
                curso: <b>Matemática</b>
              </span>
              <div className="text-body-secondary fst-italic">
                Fecha: 29/09/2019
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellat voluptatibus eius distinctio tenetur reiciendis optio
                officia facilis dolore maxime, nemo tempora eum similique?
                Exercitationem nam et sint temporibus distinctio doloremque.
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
