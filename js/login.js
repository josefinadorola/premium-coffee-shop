const formLogin = document.querySelector("#form-login");
const botonLogin = document.querySelector("#boton-login");

const login = (e) => {
    e.preventDefault();
    
    const emailLogin = document.querySelector("#correo-login").value;
    const passwordLogin = document.querySelector("#password-login").value;
    
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    const usuarioValido =usuarios.find(usuario => usuario.email === emailLogin && usuario.password === passwordLogin);
    if (!usuarioValido){
      return alert("Usuario y/o contraseña incorrectos.");
    }
      alert(`Bienvenido ${usuarioValido.name}`);
      window.location.href= "../index.html";
    
    
    }
    
    
    
    
    formLogin.addEventListener("submit", login);
    