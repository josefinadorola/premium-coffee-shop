const formRegistro = document.querySelector("#form-registro");
const inputNombre = document.querySelector("#nombre");
const inputCorreo = document.querySelector("#correo-registro");
const inputTelefono = document.querySelector("#telefono");
const inputPass = document.querySelector("#password-registro");

/*EXPRESIONES REGULARES*/

const usuarios = [];

const isEmpty = (input) => {
  return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

const isEmailValid = (input) => {
  const ex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return ex.test(input.value.trim());
};

const isExistingEmail = (input) => {
  return usuarios.some((usuario) => usuario.correo === input.value.trim());
};

//Función de error
const showError = (input, msj) => {
  const inputContainer = input.parentElement;

  inputContainer.classList.remove("success");
  inputContainer.classList.add("error");
  const error = inputContainer.querySelector("small");
  error.style.display = "block";
  error.textContent = msj;
};

const showSuccess = (input) => {
  const inputContainer = input.parentElement;
  inputContainer.classList.remove("error");
  inputContainer.classList.add("success");
  const error = inputContainer.querySelector("small");
  error.style.display = "none";
  error.textContent = "";
};

//Validación input nombre
const validateInputText = (input) => {
  let valid = false;
  const minCharacters = 3;
  const maxCharacters = 25;

  //si el input esta vacio, mostramos error
  if (isEmpty(input)) {
    showError(input, "Nombre y Apellido es obligatorio.");
    return;
  }

  //validamos cantidad de carácteres, mostramos error
  if (!isBetween(input, minCharacters, maxCharacters)) {
    showError(
      input,
      `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres.`
    );
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

//Validacion input correo
const validateInputCorreo = (input) => {
  let valid = false;

  //si el input esta vacio, mostramos error
  if (isEmpty(input)) {
    showError(input, "El correo es obligatorio.");
    return;
  }

  //validar que ser un correo
  if (!isEmailValid(input)) {
    showError(input, "El correo no es válido.");
    return;
  }

  //validar que email no exista
  if (isExistingEmail(input)) {
    showError(input, "El correo ya se encuentra registrado");
    return;
  }
  showSuccess(input);
  valid = true;
  return valid;
};

//Validación general y local storage

const validateForm = (e) => {
  //e.preventDefault();
  //Prevenir comportamiento por default
  //Validar nuevamente todos los imputs
  //Si los inputs son válidos, gaurdar la data
  //Guardar en local storage
  //Feedback al usuario
  //Redirigir al login
};

const init = () => {
  formRegistro.addEventListener("submit", validateForm);
  inputNombre.addEventListener("input", () => validateInputText(inputNombre));
  inputNombre.addEventListener("blur", () => validateInputText(inputNombre));
  inputCorreo.addEventListener("input", () => validateInputCorreo(inputCorreo));
  inputCorreo.addEventListener("blur", () => validateInputCorreo(inputCorreo));
  inputTelefono.addEventListener("input", () =>
    validateInputTelefono(inputTelefono)
  );
  inputTelefono.addEventListener("blur", () =>
    validateInputTelefono(inputTelefono)
  );
  inputPass.addEventListener("input", () => validateInputPass(inputPass));
  inputPass.addEventListener("blur", () => validateInputPass(inputPass));
};

init();
