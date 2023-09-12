import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Validation from './ResetPassValidation';

function ResetPass() {
    const [values, setValues] = useState({
      email: '',
      reg: ''
    })
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(Validation(values));
    }

  return (
    <div className="ResetPass">
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <b>REINICIO DE CONTRASEÑA</b>
              </div>
              <div class="card-body">
                <div class="image">
                  <figure class="figure">
                    <img src="https://portal.ingenieria.usac.edu.gt/images/logo_facultad/fiusac_negro.png" class="figure-img img-fluid rounded" alt="A" width="400"/>
                  </figure>
                </div>
                <br/>
                <form action="" onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label for="usuario" class="form-label">Resitro Académico</label>
                    <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="Ingrese su registro académico registrado"
                    name="reg" onChange={handleInput} />
                    {errors.reg && <span className='text-danger'>{errors.reg}</span>}
                  </div>
                  <div class="mb-3">
                    <label for="usuario" class="form-label">Correo Electrónico</label>
                    <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="Ingrese su correo electrónico registrado" 
                    name="email" onChange={handleInput} />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                  </div>
                  <br/>
                  <div class="button1">
                    <button type="submit" class="btn btn-primary">Reiniciar Contraseña</button>
                  </div>
                  <br/>
                  <br/>
                  <div class="button2">
                    <Link to="/" type="submit" class="btn btn-default border">Iniciar Sesión</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPass