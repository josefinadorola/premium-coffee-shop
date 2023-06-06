const carrito = JSON.parse(localStorage.getItem("productos-carrito"));

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoComprado = document.querySelector("#carrito-comprado");
const itemsCarrito = document.querySelector("#carrito-items");
const containerCarrito = document.querySelector(".container-carrito");

if (carrito) {
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
              <p>$${precio}</p>
            </div>
            <div class="item-cantidad">
              <p>Cantidad</p>
              <p>${cantidad}</p>
            </div>
            <div class="item-subtotal">
              <p>Subtotal</p>
              <p>${precio * cantidad}</p>
            </div>
            <i class="fa-solid fa-trash" id="${id}"></i>
    `;

    itemsCarrito.appendChild(item);
  });
} else {
  carritoVacio.classList.remove("disabled");
  containerCarrito.classList.add("disabled");
}
