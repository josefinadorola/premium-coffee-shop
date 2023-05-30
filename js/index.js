const containerShopCards = document.querySelector("#container-shop-cards");
const botonesCategorias = document.querySelectorAll(".shop-categorias");

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
};

init();
