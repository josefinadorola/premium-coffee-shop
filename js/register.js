const formRegistro = document.querySelector("#form-registro");
const botonRegistro = document.querySelector("#boton-registro");


const registro = (e) => {
  e.preventDefault();

  const inputNombre = document.querySelector("#nombre").value;
  const inputCorreoRegistro = document.querySelector("#correo-registro").value;
  const inputTelefono = document.querySelector("#telefono").value;
  const inputPassRegistro =
    document.querySelector("#password-registro").value;

  

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioRegistrado = usuarios.find(
    (usuario) => usuario.email === inputCorreoRegistro
  );

  if (usuarioRegistrado) {
    const emailRegistrado = document.querySelector("#email-registrado");
    const imputContainer = document.querySelector("#input-container-correo");
    emailRegistrado.classList.remove("disabled");
    imputContainer.classList.add("error-input");
  } else {
    usuarios.push({
      name: inputNombre,
      email: inputCorreoRegistro,
      telefono: inputTelefono,
      password: inputPassRegistro,
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    //redireccion a login
    const registroRealizado = document.querySelector("#registro-realizado");
    registroRealizado.classList.remove("disabled");
  }
};



const init = () =>{
  formRegistro.addEventListener("submit", registro);
}

init();