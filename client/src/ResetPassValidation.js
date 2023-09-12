function Validation(values) {
  let error = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const reg_pattern = /^(?=.*\d)[0-9]{9,}$/

  if(values.email === ""){
    error.email = "Por favor, ingrese un correo electrónico"
  }
  else if(!email_pattern.test(values.email)) {
    error.email = "Por favor, ingrese un correo electrónico válido"
  }
  else {
    error.email = ""
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
  return error;
}

export default Validation;