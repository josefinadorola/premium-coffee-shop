const formRegistro = document.querySelector("#form-registro");
const inputNombre = document.querySelector("#nombre");
const inputCorreoRegistro = document.querySelector("#correo-registro");
const inputTelefono = document.querySelector("#telefono");
const inputPassRegistro = document.querySelector("#password-registro");

const inputs = document.querySelectorAll("#form-registro input");


/*EXPRESIONES REGULARES*/ 

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	password: /^.{4,12}$/ // 4 a 12 digitos.

}

const validarInputs = () => {
 console.log("funciona");
}


inputs.forEach((input) => {
  input.addEventListener('keyup', validarInputs);
  input.addEventListener('blur', validarInputs);
});




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

