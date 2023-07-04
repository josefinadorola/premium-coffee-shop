let carrito = localStorage.getItem("productos-carrito");
carrito = JSON.parse(carrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoComprado = document.querySelector("#carrito-comprado");
const itemsCarrito = document.querySelector("#carrito-items");
const containerCarrito = document.querySelector(".container-carrito");
let botonesEliminar = document.querySelectorAll(".boton-eliminar");
const vaciarCarritoBoton = document.querySelector("#vaciar-carrito");
const comprarCarritoBoton = document.querySelector("#comprar-carrito");
const totalCarrito = document.querySelector("#total-carrito");

const cargarProductosCarrito = () => {
  if (carrito && carrito.length > 0) {
    carritoVacio.classList.add("disabled");
    containerCarrito.classList.remove("disabled");
    carritoComprado.classList.add("disabled");

    itemsCarrito.innerHTML = "";

    carrito.forEach((producto) => {
      const { id, nombre, precio, imagen, cantidad } = producto;

      const item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = `
           <img src="${imagen}" alt="${nombre}"/>
              <div class="item-datos">
                <p>${nombre}</p>
                <p>$${precio.toLocaleString()}</p>
              </div>
              <div class="item-cantidad">
                <p>Cantidad</p>
                <p>${cantidad}</p>
              </div>
              <div class="item-subtotal">
                <p>Subtotal</p>
                <p id="calculo-subtotal">${(
                  precio * cantidad
                ).toLocaleString()}</p>
              </div>
              <button class="boton-eliminar" id="${id}"><i class="fa-solid fa-xmark"></i></button>
      `;

      itemsCarrito.appendChild(item);
    });
  } else {
    carritoVacio.classList.remove("disabled");
    containerCarrito.classList.add("disabled");
    carritoComprado.classList.add("disabled");
  }
  actualizarBotonesEliminar();
  actualizarTotal();
};

const actualizarBotonesEliminar = () => {
  botonesEliminar = document.querySelectorAll(".boton-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
};

const eliminarDelCarrito = (e) => {
  const idBotonEliminar = e.currentTarget.id;

  const index = carrito.findIndex((producto) => producto.id == idBotonEliminar);

  console.log(idBotonEliminar);
  carrito.splice(index, 1);
  cargarProductosCarrito();

  localStorage.setItem("productos-carrito", JSON.stringify(carrito));
};

const vaciarCarrito = () => {
  carrito.length = 0;
  localStorage.setItem("productos-carrito", JSON.stringify(carrito));
  cargarProductosCarrito();
};

const actualizarTotal = () => {
  const calculoTotal = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  totalCarrito.innerText = `$${calculoTotal.toLocaleString()}`;
};

const comprarCarrito = () => {
  carrito.length = 0;
  localStorage.setItem("productos-carrito", JSON.stringify(carrito));

  carritoVacio.classList.add("disabled");
  containerCarrito.classList.add("disabled");
  carritoComprado.classList.remove("disabled");
};

const init = () => {
  cargarProductosCarrito();

  vaciarCarritoBoton.addEventListener("click", vaciarCarrito);
  comprarCarritoBoton.addEventListener("click", comprarCarrito);
};

init();
