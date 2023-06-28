const formRegistro = document.querySelector("#form-registro");
const inputNombre = document.querySelector("#nombre");
const inputCorreo = document.querySelector("#correo-registro");
const inputTelefono = document.querySelector("#telefono");
const inputPass = document.querySelector("#password-registro");




/*EXPRESIONES REGULARES*/ 

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	password: /^.{8,12}$/ // 4 a 12 digitos.

}

const isEmpty = (input) => {
  return !input.value.trim().length;
}

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
}

//Función de error
const showError = (input, msj) => {
  const inputContainer = input.parentElement;
  inputContainer.classList.remove("success");
  inputContainer.classList.add("error");
  const error = inputContainer.querySelector("small");
  error.style.display = "block";
  error.textContent = msj;
}

const showSuccess = (input) => {
  const inputContainer = input.parentElement;
  inputContainer.classList.remove("error");
  inputContainer.classList.add("success");
  const error = inputContainer.querySelector("small");
  error.style.display = "none";
  error.textContent = "";
  
}


//Validación Inputs
const validateInputText = (input) => {
  let valid = false;
  const minCharacters = 3;
  const maxCharacters = 40;


  if (isEmpty(input)){
       //si el input esta vacio, mostramos error
      showError(input, "Este campo es obligatorio");
      return;
     }

   //validamos cantidad de carácteres, mostramos error
  if(!isBetween(input, minCharacters, maxCharacters)){
    showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`);
  }
 
  showSuccess(input);
  valid= true;
  return valid;

}


//Validación general y local storage

const validateForm = (e) => {

  //e.preventDefault();

  //Prevenir comportamiento por default
  //Validar nuevamente todos los imputs
  //Si los inputs son válidos, gaurdar la data
  //Guardar en local storage
  //Feedback al usuario
  //Redirigir al login

}



const init = () => {
  formRegistro.addEventListener("submit", validateForm);
  inputNombre.addEventListener("input", () => validateInputText(inputNombre));
  inputCorreo.addEventListener("input", () => validateInputCorreo(inputCorreo));
  inputTelefono.addEventListener("input", () => validateInputTelefono(inputTelefono));
  inputPass.addEventListener("input", () => validateInputPass(inputPass));
}

init();

