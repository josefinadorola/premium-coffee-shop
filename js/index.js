const containerShopCards = document.querySelector("#container-shop-cards");
const Card = document.querySelector(".card");
const botonesCategorias = document.querySelectorAll(".shop-categorias");
const toggleMenu = document.querySelector("#toggle-menu");
const cart = document.querySelector("#cart");
const nav = document.querySelector("#nav");
const closeMenu = document.querySelector("#close-menu");
const backMenu = document.querySelector("#back-menu");

let carrito = [];


const cargarProductos = (productos) => {
  containerShopCards.innerHTML = "";

  productos.forEach((producto) => {
    const { id, nombre, categoria, precio, imagen } = producto;

    const card = document.createElement("div");
    card.classList.add("card-shop");
    card.innerHTML += `
                    <img src="${imagen}" alt="capsula" alt="${nombre}"/>
                    <p class="card-titulo">${nombre}</p>
                    <p class="card-precio">$${precio}</p>
                    <button id="${id}">COMPRAR</button>

               `;
    containerShopCards.appendChild(card);
  });
};


const filtroCategorias = () => {

  botonesCategorias.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      botonesCategorias.forEach((boton) => boton.classList.remove("active"));
      e.currentTarget.classList.add("active");

      if (e.currentTarget.id != "todos") {
        const productosFiltrados = productos.filter(
          (producto) => producto.categoria === e.currentTarget.id
        );
        cargarProductos(productosFiltrados);
      } else {
        cargarProductos(productos);
      }
    });
  });

}

const cargarCarrito = () =>{

  productos.forEach((producto) => {
    
  });



}



const mostrarMenu = () => {
  nav.classList.add("visible");
  backMenu.style.display = "block";
};

const cerrarrMenu = () => {
  nav.classList.remove("visible");
  backMenu.style.display = "none";
};

const init = () => {
  cargarProductos(productos);
  
  filtroCategorias();



  toggleMenu.addEventListener("click", mostrarMenu);

  closeMenu.addEventListener("click", cerrarrMenu);
  backMenu.addEventListener("click", cerrarrMenu);
  nav.addEventListener("click", cerrarrMenu);

  

};

init();
