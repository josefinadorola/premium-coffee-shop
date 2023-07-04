const formRegistro = document.querySelector("#form-registro");
const inputNombre = document.querySelector("#nombre");
const inputCorreo = document.querySelector("#correo-registro");
const inputTelefono = document.querySelector("#telefono");
const inputPass = document.querySelector("#password-registro");
const modalRegistro = document.querySelector("#modal-registro");

/*EXPRESIONES REGULARES*/

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

//funcion campo vacío
const isEmpty = (input) => {
  return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

//funcion correo válido
const isEmailValid = (input) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(input.value.trim());
};

//funcion correo existente en array
const isExistingEmail = (input) => {
  return usuarios.some((usuario) => usuario.correo === input.value.trim());
};

//funcion tel válido
const isTelefonoValid = (input) => {
  const re = /^[0-9]{10}$/;
  return re.test(input.value.trim());
};

//funcion pass válido
const isPassSecure = (input) => {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(input.value.trim());
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

//funcion validadora
const showSuccess = (input) => {
  const inputContainer = input.parentElement;
  inputContainer.classList.remove("error");
  inputContainer.classList.add("success");
  const error = inputContainer.querySelector("small");
  error.style.display = "none";
  error.textContent = "";
};

/* VALIDACIONES DE INPUTS */

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

//validacion teléfono
const validateInputTelefono = (input) => {
  let valid = false;

  //si el input esta vacio, mostramos error
  if (isEmpty(input)) {
    showError(input, "El teléfono es obligatorio.");
    return;
  }

  if (!isTelefonoValid(input)) {
    showError(input, "El teléfono no es válido.");
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

//validacion password
const validateInputPass = (input) => {
  let valid = false;

  //si el input esta vacio, mostramos error
  if (isEmpty(input)) {
    showError(input, "La contraseña es obligatoria.");
    return;
  }

  if (!isPassSecure(input)) {
    showError(
      input,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un simbolo."
    );
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

/* FIN VALIDACIONES DE INPUTS */

//Validación general y local storage

const validateForm = (e) => {
  //Prevenir comportamiento por default
  e.preventDefault();
  //Validar nuevamente todos los imput
  let nombreValido = validateInputText(inputNombre);
  let correoValido = validateInputCorreo(inputCorreo);
  let telValido = validateInputTelefono(inputTelefono);
  let passValido = validateInputPass(inputPass);

  let formValido = nombreValido && correoValido && telValido && passValido;
  //Si los inputs son válidos, gaurdar la data
  if (formValido) {
    usuarios.push({
      nombre: inputNombre.value,
      correo: inputCorreo.value,
      telefono: inputTelefono.value,
      password: inputPass.value,
    });
    //Guardar en local storage
    saveToLocalStorage();
    //Feedback al usuario
    modalRegistro.style.transform = "translateY(0)";
    setTimeout(() => {
      modalRegistro.style.transform = "translateY(-200%)";
    }, 1500);
    //redirigir al login
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 2500);
  }
};

const init = () => {
  formRegistro.addEventListener("submit", validateForm);
  inputNombre.addEventListener("input", () => validateInputText(inputNombre));
  inputCorreo.addEventListener("input", () => validateInputCorreo(inputCorreo));
  inputTelefono.addEventListener("input", () =>
    validateInputTelefono(inputTelefono)
  );
  inputPass.addEventListener("input", () => validateInputPass(inputPass));
};

init();
