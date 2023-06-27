const formLogin = document.querySelector("#form-login");
const botonLogin = document.querySelector("#boton-login");
const emailLogin = document.querySelector("#correo-login");
const passwordLogin = document.querySelector("#password-login");

const login = (e) => {
    e.preventDefault();
    
       const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    const usuarioValido =usuarios.find(usuario => usuario.correo === emailLogin.value && usuario.password === passwordLogin.value);
    if (!usuarioValido){
      //Mostrar error
      const showError = document.querySelector(".show-error");
      showError.classList.remove("disabled");
    }
      alert(`Bienvenido ${usuarioValido.nombre}`);
      localStorage.setItem('login_success', JSON.stringify(usuarioValido));
      window.location.href= "../index.html";
    
    
    }
    
    
    
    
    formLogin.addEventListener("submit", login);
    