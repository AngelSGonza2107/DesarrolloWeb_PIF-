function Validation(values) {
  let error = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
  const reg_pattern = /^(?=.*\d)[0-9]{9,}$/

  if(values.name === "") {
    error.name = "Por favor, ingrese un nombre"
  }
  else {
    error.name = ""
  }

  if(values.reg === "") {
    error.reg = "Por favor, ingrese un valor"
  }
  else if(!reg_pattern.test(values.reg)) {
    error.reg = "Por favor, ingrese un valor válido"
  }
  else {
    error.reg = ""
  }
  
  if(values.email === "") {
    error.email = "Por favor, ingrese un correo electrónico"
  }
  else if(!email_pattern.test(values.email)) {
    error.email = "Por favor, ingrese un correo electrónico válido"
  }
  else {
    error.email = ""
  }

  if(values.password === "") {
    error.password = "Por favor, ingrese una contraseña"
  }
  else if(!password_pattern.test(values.password)) {
    error.password = "Por favor, ingrese una contraseña válida (mínimo 8 caracteres)"
  }
  else {
    error.password = ""
  }
  return error;
}

export default Validation;