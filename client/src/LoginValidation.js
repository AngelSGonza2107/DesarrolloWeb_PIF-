function Validation(values) {
  let error = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

  if(values.email === ""){
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
    error.password = "Por favor, ingrese una contraseña válida"
  }
  else {
    error.password = ""
  }
  return error;
}

export default Validation;