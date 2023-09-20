import { useState } from "react";
import Publicacion from "../componentes/Publicacion";
import DefaultLayout from "../layouts/DefaultLayout";

export default function MainSite(props) {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const publicaciones = [ // estas publicaciones obviamente son falsas, intercambiarlas por las obtenidas de la base de datos
    {
      tipo: "curso", //"curso | catedratico"
      fecha: "99/99/9999",
      autorEmail: "autor1@email.com",
      autorRegistro: "202299999",
      tipoContenido: "Matemática Básica 1", // nombre del curso O nombre del catedrático
      contenido: "Este es el contenido de la publicación1",
      comentarios: [
        {
          autorEmail: "autorComentario@email.com",
          autorRegistro: "202288888",
          contenido: "Este es el comentario 1",
        },
        {
          autorEmail: "autorComentario@email.com",
          autorRegistro: "202288888",
          contenido: "Este es el contenido 2",
        },
      ],
    },
    {
      tipo: "catedrático", //"curso | catedratico"
      fecha: "88/88/8888",
      autorEmail: "autor2@email.com",
      autorRegistro: "202288888",
      tipoContenido: "Carlos Pérez", // nombre del curso O nombre del catedrático
      contenido: "Este es el contenido de la publicación2",
      comentarios: [
        {
          autorEmail: "autorComentario@email.com",
          autorRegistro: "202288888",
          contenido: "Este es el comentario ADGALSDJF1",
        },
        {
          autorEmail: "autorComentario@email.com",
          autorRegistro: "202288888",
          contenido: "Este es el contenido 2",
        },
      ],
    },
    {
      tipo: "curso", //"curso | catedratico"
      fecha: "77/77/7777",
      autorEmail: "autor3@email.com",
      autorRegistro: "202277777",
      tipoContenido: "Física 2", // nombre del curso O nombre del catedrático
      contenido:
        "Ayuda, como se resuelve el problema 22.3. Algo así se vería el contenido de las publicaciones",
      comentarios: [
        {
          autorEmail: "autorComentario@email.com",
          autorRegistro: "202288888",
          contenido: "Este es el comentario 1",
        },
        {
          autorEmail: "autorComentario@email.com",
          autorRegistro: "202288888",
          contenido: "Este es el contenido 2",
        },
      ],
    },
  ]; // Cambiarlas por las reales

  return (
    <DefaultLayout>
      <div className="row">
        <div className="col-sm-9 col-md-9 col-xl-6 mx-auto">
          <div>
            {sesionIniciada ? (
              <h3>Bienvenido #email_user_que_inicio_sesion#</h3>
            ) : (
              <h3>Menú Inicial</h3>
            )}
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

          {sesionIniciada ? (
            <>
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
            </>
          ) : (
            <div class="alert alert-secondary" role="alert">
              <b>!</b> Para crear una publicación, debes de iniciar sesión
            </div>
          )}

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
              style={{ width: "300px" }}
            />
          </div>
          <h5 className="my-4">Ordenar por:</h5>
          <div className="row">
            <div className="col">
              <input
                type="radio"
                id="ninguno"
                name="ordenar-por-curso-o-catedratico"
                defaultChecked
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

          <div className="mt-4 d-flex flex-column row-gap-4">
            {publicaciones.length === 0 ? (
              <div class="alert alert-info" role="alert">
                No hay publicaciones
              </div>
            ) : (
              publicaciones.map((publi) => {
                return (
                  <Publicacion
                    tipo={publi.tipo}
                    fecha={publi.fecha}
                    autorEmail={publi.autorEmail}
                    autorRegistro={publi.autorRegistro}
                    tipoContenido={publi.tipoContenido}
                    contenido={publi.contenido}
                    comentarios={publi.comentarios}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
