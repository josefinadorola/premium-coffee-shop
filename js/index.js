const containerShopCards = document.querySelector("#container-shop-cards");
const Card = document.querySelector(".card");
const botonesCategorias = document.querySelectorAll(".shop-categorias");
const toggleMenu = document.querySelector("#toggle-menu");
const cart = document.querySelector("#cart");
const nav = document.querySelector("#nav");
const closeMenu = document.querySelector("#close-menu");
const backMenu = document.querySelector("#back-menu");
let botonesAgregar = document.querySelectorAll(".boton-comprar");
const numerito = document.querySelector("#numerito");
const usuarioActivo = document.querySelector("#usuario-activo");

let carrito;
let carritoLS = localStorage.getItem("productos-carrito");

if (carritoLS) {
  carrito = JSON.parse(carritoLS);
  actualizarNumerito();
} else {
  carrito = [];
}

const cargarProductos = (productos) => {
  containerShopCards.innerHTML = "";

  productos.forEach((producto) => {
    const { id, nombre, precio, imagen } = producto;

    const card = document.createElement("div");
    card.classList.add("card-shop");
    card.innerHTML += `
                    <img src="${imagen}" alt="${nombre}"/>
                    <p class="card-titulo">${nombre}</p>
                    <p class="card-precio">$${precio}</p>
                    <button class="boton-comprar" id="${id}"><i class="fa-solid fa-cart-plus"></i></button>

               `;
    containerShopCards.appendChild(card);
  });
  actualizarBotonesAgregar();
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
};

const actualizarBotonesAgregar = () => {
  botonesAgregar = document.querySelectorAll(".boton-comprar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  });
};

const agregarCarrito = (e) => {
  const idBotonComprar = e.currentTarget.id;

  const productoAgregado = productos.find(
    (producto) => producto.id == idBotonComprar
  );

  if (carrito.some((producto) => producto.id == idBotonComprar)) {
    const index = carrito.findIndex(
      (producto) => producto.id == idBotonComprar
    );
    carrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    carrito.push(productoAgregado);
  }

  actualizarNumerito();
  alert(`El artículo ${productoAgregado.nombre} ha sido agregado al carrito.`);

  localStorage.setItem("productos-carrito", JSON.stringify(carrito));
};

function actualizarNumerito() {
  let nuevoNumerito = carrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerHTML = nuevoNumerito;
}

const mostrarMenu = () => {
  nav.classList.add("visible");
  backMenu.style.display = "block";
};

const cerrarrMenu = () => {
  nav.classList.remove("visible");
  backMenu.style.display = "none";
};

const usuarioActivoSS = JSON.parse(sessionStorage.getItem("usuario-activo"));

const showUsuario = () => {
  usuarioActivo.textContent = `Hola, ${usuarioActivoSS.nombre}`;
};

const init = () => {
  cargarProductos(productos);
  filtroCategorias();

  toggleMenu.addEventListener("click", mostrarMenu);

  closeMenu.addEventListener("click", cerrarrMenu);
  backMenu.addEventListener("click", cerrarrMenu);
  nav.addEventListener("click", cerrarrMenu);

  showUsuario();
};

init();
