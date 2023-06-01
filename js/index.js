const containerShopCards = document.querySelector("#container-shop-cards");
const botonesCategorias = document.querySelectorAll(".shop-categorias");
const toggleMenu = document.querySelector("#toggle-menu");
const cart = document.querySelector("#cart");
const nav = document.querySelector("#nav");
const closeMenu = document.querySelector("#close-menu");
const backMenu = document.querySelector("#back-menu");
const menuOpciones = document.querySelector(".menu-opciones");

const cargarProductos = (productos) => {
  containerShopCards.innerHTML = "";

  productos.forEach((producto) => {
    const { id, nombre, categoria, precio, imagen } = producto;

    const div = document.createElement("div");
    div.classList.add("card-shop");
    div.innerHTML += `
                    <img src="${imagen}" alt="capsula" alt="${nombre}"/>
                    <p>${nombre}</p>
                    <p>$${precio}</p>
                    <button id="${id}">COMPRAR</button>

               `;
    containerShopCards.append(div);
  });
};

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

  toggleMenu.addEventListener("click", mostrarMenu);

  closeMenu.addEventListener("click", cerrarrMenu);
  backMenu.addEventListener("click", cerrarrMenu);
  nav.addEventListener("click", cerrarrMenu);
};

init();
