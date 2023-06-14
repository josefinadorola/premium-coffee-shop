const formLogin = document.querySelector("#form-login");
const botonLogin = document.querySelector("#boton-login");

const login = (e) => {
    e.preventDefault();
    
    const emailLogin = document.querySelector("#correo-login").value;
    const passwordLogin = document.querySelector("#password-login").value;
    
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    const usuarioValido =usuarios.find(usuario => usuario.email === emailLogin && usuario.password === passwordLogin);
    if (!usuarioValido){
      //Mostrar error
      const showError = document.querySelector(".show-error");
      showError.classList.remove("disabled");
    }
      alert(`Bienvenido ${usuarioValido.name}`);
      localStorage.setItem('login_success', JSON.stringify(usuarioValido));
      window.location.href= "../index.html";
    
    
    }
    
    
    
    
    formLogin.addEventListener("submit", login);
    