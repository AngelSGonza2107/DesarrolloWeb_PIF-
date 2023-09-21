import { useState ,useEffect} from "react";
import { useLocation } from "react-router-dom";
import Publicacion from "../componentes/Publicacion";
import DefaultLayout from "../layouts/DefaultLayout";

export default function MainSite(props) {

  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [tipoPublicacion, setTipoPublicacion] = useState("");
  const location = useLocation();
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [nombresCursos, setNombresCursos] = useState([]);
  const [publicacionContenido, setPublicacionContenido] = useState("");
  const [comentarioContenido, setComentarioContenido] = useState("");
  const [publicacionIdSeleccionada, setPublicacionIdSeleccionada] = useState("");


  const { user } = location.state || {}; // Obtiene el correo del usuario desde el estado

  const [publicaciones, setPublicaciones] = useState([]);
  useEffect(() => {
    if (user) {
      setSesionIniciada(true);
      setUserEmail(user);
    }
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:8000/cursos") // Reemplaza la URL con la ruta correcta de tu servidor
      .then((response) => response.json())
      .then((data) => {
        setNombresCursos(data); // Actualiza el estado con los nombres de los cursos obtenidos
      })
      .catch((error) => {
        console.error("Error al obtener los nombres de los cursos: " + error.message);
      });
  }, []);

  useEffect(() => {
    // Realizar una solicitud GET al servidor para obtener las publicaciones desde la base de datos
    fetch("http://localhost:8000/publicaciones") // Reemplaza la URL con la ruta correcta de tu servidor
      .then((response) => response.json())
      .then((data) => {
        setPublicaciones(data); // Actualiza el estado con las publicaciones obtenidas
      })
      .catch((error) => {
        console.error("Error al obtener las publicaciones: " + error.message);
      });
  }, []);
  
  const agregarPublicacion = () => {
    // Realiza una solicitud POST al servidor para agregar la publicación
    fetch("http://localhost:8000/agregarPublicacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tipo: tipoPublicacion, // Usa el valor seleccionado en el combobox como el tipo de publicación
        contenido: publicacionContenido,
        usuarioEmail: userEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Limpiar los campos después de agregar la publicación
        setTipoPublicacion("");
        setPublicacionContenido("");
      })
      .catch((error) => {
        console.error("Error al agregar la publicación: " + error.message);
      });
  };

  const agregarComentario = () => {
    if (!publicacionIdSeleccionada) {
      alert("Por favor, seleccione una publicación antes de agregar un comentario.");
      return;
    }
    fetch("http://localhost:8000/agregarComentario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicacionId:  publicacionIdSeleccionada,
        autorEmail: userEmail,
        contenido: comentarioContenido,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Limpiar el campo de contenido después de agregar el comentario
        setComentarioContenido("");
      })
      .catch((error) => {
        console.error("Error al agregar el comentario: " + error.message);
      });
  };
  
  return (
    <DefaultLayout>
      <div className="row">
        <div className="col-sm-9 col-md-9 col-xl-6 mx-auto">
          <div>
            {sesionIniciada ? (
              <h3>Bienvenido {userEmail}</h3>
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
          
          <div className="mt-3">
            <b>Curso: </b>
            <select
              className="p-1 border rounded"
              style={{ width: "200px" }}
              value={tipoPublicacion}
              onChange={(e) => setTipoPublicacion(e.target.value)}
            >
              <option value="">Seleccione un curso</option>
              {nombresCursos.map((curso) => (
                <option key={curso} value={curso}>
                  {curso}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <b>Contenido:</b>
          <textarea
            className="form-control mt-2"
            rows="5"
            value={publicacionContenido}
            onChange={(e) => setPublicacionContenido(e.target.value)}
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn mt-3 px-5 py-2 btn-primary"
            onClick={agregarPublicacion}
          >
            Publicar
          </button>
        </div>
        <h3>Agregar Comentario:</h3>
    <div className="card">
      <div className="card-body">
        <div>
          <b>Seleccionar Publicación:</b>
          <select
            className="p-1 border rounded"
            style={{ width: "200px" }}
            value={publicacionIdSeleccionada}
            onChange={(e) => setPublicacionIdSeleccionada(e.target.value)}
          >
            <option value="">Seleccione una publicación</option>
            {/* Mapea las publicaciones disponibles para crear opciones en el combobox */}
            {publicaciones.map((publi) => (
              <option key={publi.id} value={publi.id}>
                Publicación #{publi.id}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <b>Contenido del Comentario:</b>
          <textarea
            className="form-control mt-2"
            rows="3"
            value={comentarioContenido}
            onChange={(e) => setComentarioContenido(e.target.value)}
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn mt-3 px-5 py-2 btn-primary"
            onClick={agregarComentario}
          >
            Agregar Comentario
          </button>
        </div>
      </div>
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
                key={publi.id} // Asegura que cada publicación tenga una clave única
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