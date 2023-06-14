const formRegistro = document.querySelector("#form-registro");
const formLogin = document.querySelector("#form-login");
const inputCorreoLogin = document.querySelector("#correo-login");
const inputContraseñalogin = document.querySelector("#password-login");
const botonRegistro = document.querySelector("#boton-registro");
const botonLogin = document.querySelector("#boton-login");

const registro = (e) => {
  e.preventDefault();

  const inputNombre = document.querySelector("#nombre").value;
  const inputCorreoRegistro = document.querySelector("#correo-registro").value;
  const inputTelefono = document.querySelector("#telefono").value;
  const inputContraseñaRegistro =
    document.querySelector("#password-registro").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioRegistrado = usuarios.find(
    (usuario) => usuario.email === inputCorreoRegistro
  );

  if (usuarioRegistrado) {
    return alert("El usuario ya esta registrado");
  } else {
    usuarios.push({
      name: inputNombre,
      email: inputCorreoRegistro,
      telefono: inputTelefono,
      password: inputContraseñaRegistro,
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    //redireccion a login
    const registroRealizado = document.querySelector("#registro-realizado");
    registroRealizado.classList.remove("disabled");
  }
};

formRegistro.addEventListener("submit", registro);
