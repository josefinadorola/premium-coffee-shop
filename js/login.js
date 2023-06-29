const formLogin = document.querySelector("#form-login");
const inputCorreo = document.querySelector("#correo-login");
const inputPass = document.querySelector("#password-login");
const errorMsj = document.querySelector("#form-error");

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const saveToSessionStorage = (usuario) => {
  sessionStorage.setItem("usuario-activo", JSON.stringify(usuario));
};

//funcion campo vacío
const isEmpty = (input) => {
  return !input.value.trim().length;
};

//Validar si existe el correo
const correoExistente = () => {
  return usuarios.some(
    (usuario) => usuario.correo === inputCorreo.value.trim()
  );
};

//validar si coinciden el correo con su pass
const coincidenCorreoPass = () => {
  const usuario = usuarios.find(
    (usuario) => usuario.correo === inputCorreo.value.trim()
  );
  return usuario.password === inputPass.value.trim();
};

//Función de error
const showError = (msj) => {
  errorMsj.textContent = msj;
};

//validación de usuario
const cuentaValida = () => {
  let valid = false;

  if (isEmpty(inputCorreo)) {
    showError("Por favor, complete los campos.");
    return;
  }

  if (isEmpty(inputPass)) {
    showError("Por favor, complete los campos.");
    return;
  }

  //chequear que el correo exista
  if (!correoExistente(inputCorreo)) {
    showError("El correo ingresado no es válido.");
    return;
  }

  //chequear sin coinciden correo y pass
  if (!coincidenCorreoPass()) {
    showError("Los contraseña ingresada con es válida.");
    return;
  }

  valid = true;
  errorMsj.textContent = "";
  return valid;
};

const login = (e) => {
  //prevenir comportamiento por default
  e.preventDefault();

  if (cuentaValida()) {
    const usuario = usuarios.find(
      (usuario) => usuario.correo === inputCorreo.value.trim()
    );

    //guardamos en Sesion Storage
    saveToSessionStorage(usuario);
    // //traer usuario correspondiente
    alert(`Bienvenido ${usuario.nombre}`);

    //redirigir al home
    window.location.href = "../index.html";
  }
};

const init = () => {
  formLogin.addEventListener("submit", login);
};

init();
