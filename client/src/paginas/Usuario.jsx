import DefaultLayout from "../layouts/DefaultLayout";

export default function Usuario() {
  return (
    <DefaultLayout>
      <div className="col-8">
        <h1>Mi Perfil | #correo#</h1>

        <div>
          <div className="d-flex flex-column">
            <b>Nombre completo:</b>
            <div className="d-flex gap-3 mt-2 align-items-center">
              <p style={{transform: "translateY(5px)"}}>#nombreCompleto#</p>
              <button className="btn btn-primary">Editar</button>
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <b>Correo electrónico:</b>
            <div className="d-flex gap-3 mt-2 align-items-center">
              <p style={{transform: "translateY(5px)"}}>#correoElectronico#</p>
              <button className="btn btn-primary">Editar</button>
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <b>Registro Académico:</b>
            <div className="d-flex gap-3 mt-2 align-items-center">
              <p style={{transform: "translateY(5px)"}}>#nombreCompleto#</p>
              <button className="btn btn-primary">Editar</button>
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <b>Contraseña:</b>
            <div className="d-flex gap-3 mt-2 align-items-center">
              <p style={{transform: "translateY(5px)"}}>#contrasena#</p>
              <button className="btn btn-primary">Editar</button>
            </div>
          </div>
        </div>

        <h2 className="mt-5">Cursos</h2>
        <div>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Cursos Aprobados
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Todos los cursos
              </a>
            </li>
          </ul>
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
