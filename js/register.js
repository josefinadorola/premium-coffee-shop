const formRegistro = document.querySelector("#form-registro");
const inputNombre = document.querySelector("#nombre");
const inputCorreoRegistro = document.querySelector("#correo-registro");
const inputTelefono = document.querySelector("#telefono");
const inputPassRegistro = document.querySelector("#password-registro");

const inputs = document.querySelectorAll("#form-registro input");


/*EXPRESIONES REGULARES*/ 

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	password: /^.{8,12}$/ // 4 a 12 digitos.

}

// const validarInputs = () => {
//  console.log("funciona");
// }


// inputs.forEach((input) => {
//   input.addEventListener('keyup', validarInputs);
//   input.addEventListener('blur', validarInputs);
// });


const validarNombre = () => {
  if (expresiones.nombre.test(inputNombre.value)){
    document.querySelector("#icono-error-nombre").style.visibility=("hidden");
    document.querySelector("#nombre-vacio").classList.add("disabled")
    document.querySelector("#icono-validacion-nombre").style.visibility=("visible");
  }
  else{ 
    document.querySelector("#icono-error-nombre").style.visibility=("visible");
  document.querySelector("#nombre-vacio").classList.remove("disabled")}

}


const validarCorreo = () => {
  if (expresiones.correo.test(inputCorreoRegistro.value) ){
    document.querySelector("#icono-error-correo").style.visibility=("hidden");
    document.querySelector("#correo-vacio").classList.add("disabled")
    document.querySelector("#icono-validacion-correo").style.visibility=("visible");
  }
  else{ 
    document.querySelector("#icono-error-correo").style.visibility=("visible");
  document.querySelector("#correo-vacio").classList.remove("disabled")}

}

const validarTelefono = () => {
  if (expresiones.telefono.test(inputTelefono.value) ){
    document.querySelector("#icono-error-telefono").style.visibility=("hidden");
    document.querySelector("#tel-vacio").classList.add("disabled")
    document.querySelector("#icono-validacion-telefono").style.visibility=("visible");
  }
  else{ 
    document.querySelector("#icono-error-telefono").style.visibility=("visible");
  document.querySelector("#tel-vacio").classList.remove("disabled")}

}

const validarPassword = () => {
  if (expresiones.password.test(inputPassRegistro.value) ){
    document.querySelector("#icono-error-password").style.visibility=("hidden");
    document.querySelector("#pass-vacio").classList.add("disabled")
    document.querySelector("#icono-validacion-password").style.visibility=("visible");
  }
  else{ 
    document.querySelector("#icono-error-password").style.visibility=("visible");
  document.querySelector("#pass-vacio").classList.remove("disabled")}

}


const registro = (e) => {
  e.preventDefault();

    

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioRegistrado = usuarios.find(
    (usuario) => usuario.correo === inputCorreoRegistro.value
  );

  if (usuarioRegistrado) {
    const emailRegistrado = document.querySelector("#email-registrado");
    const imputContainer = document.querySelector("#input-container-correo");
    emailRegistrado.classList.remove("disabled");
    imputContainer.classList.add("error-input");
  } else {
    usuarios.push({
      nombre: inputNombre.value,
      correo: inputCorreoRegistro.value,
      telefono: inputTelefono.value,
      password: inputPassRegistro.value,
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    //redireccion a login
    document.querySelector("#registro-realizado").classList.remove("disabled");
    
  }
};

formRegistro.addEventListener("submit", registro);

inputNombre.addEventListener('blur', validarNombre);
inputCorreoRegistro.addEventListener('blur', validarCorreo);
inputTelefono.addEventListener('blur', validarTelefono);
inputPassRegistro.addEventListener('blur', validarPassword);

