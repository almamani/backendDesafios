const prodCarrito = document.getElementById("prodCarrito");
const pieCarrito = document.getElementById("pieCarrito");
const templateProdCarrito = document.getElementById(
  "template-prod-carrito"
).content;
const templatePieCarrito = document.getElementById(
  "template-pie-carrito"
).content;
const fragment = document.createDocumentFragment();

let idCart;
let idUser;
let carritoObjeto = [];

document.addEventListener("DOMContentLoaded", (e) => {
  fetchUsuario();
});

//Traer el ID del Usuario
const fetchUsuario = async () => {
  try {
    const res = await fetch("/idUsuario");
    const data = await res.json();
    fetchCarrito(data);
  } catch (error) {
    console.log(error);
  }
};

//Traer el ID del Carrito del Usuario Logueado
const fetchCarrito = async (usuario) => {
  try {
    const res = await fetch(`api/carrito/idCarrito/${usuario}`);
    data = await res.json();
    idCart = data._id;
    idUser = usuario;
    fetchMostrarCarrito();
  } catch (error) {
    console.log(error);
  }
};

//Traer Productos del Carrito del Usuario
const fetchMostrarCarrito = async () => {
  try {
    const res = await fetch(`/api/carrito/${idCart}/productos`);
    carritoObjeto = await res.json();
    pintarProdCarrito();
  } catch (error) {
    console.log(error);
  }
};

//Pintar Productos del Carrito
const pintarProdCarrito = () => {
  prodCarrito.textContent = "";
  pieCarrito.textContent = "";
  carritoObjeto.forEach((item) => {
    templateProdCarrito.querySelector("#title").textContent = item.title;
    templateProdCarrito.querySelector("#description").textContent =
      item.description;
    templateProdCarrito.querySelector("#price span").textContent = item.price;
    templateProdCarrito.querySelector(".btn-danger").dataset.id = item._id;
    const clone = templateProdCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  prodCarrito.appendChild(fragment);

  const cartMedida = carritoObjeto.length;
  if (cartMedida === 0 ) {
    pieCarrito.textContent = "Carrito Vacío - Comienza a Comprar"
  } else {
    const clone = templatePieCarrito.cloneNode(true);
    fragment.appendChild(clone);
    pieCarrito.appendChild(fragment);
    
  }
};

//Boton Elimar un  Producto del Carrito
document.addEventListener("click", (e) => {
  if (e.target.matches(".list-group-item .btn-danger")) {
    fetchEliminarProducto(e.target.parentElement);
  }
  e.stopPropagation();
});

//Eliminar un Producto del Carrito
const fetchEliminarProducto = async (objeto) => {
  const id_prod = objeto.querySelector(".btn-danger").dataset.id;
  try {
    const res = await fetch(`/api/carrito/${idCart}/productos/${id_prod}`, {
      method: "DELETE",
    });
    fetchMostrarCarrito();
  } catch (error) {
    console.log(error);
  }
};

//Boton Finalizar Compra
document.addEventListener("click", (e) => {
  if (e.target.matches(".list-group-item .btn-secondary")) {
    fetchFinalizarCompra();
  }
  e.stopPropagation();
});

// Finalizar Compra
const fetchFinalizarCompra = async () => {
  console.log(`Id usuario: ${idUser}`);
  try {
    const res = await fetch(`/api/carrito/finalizar/${idUser}`, {
      method: "PUT",
    });
    fetchMostrarCarrito();
  } catch (error) {
    console.log(error);
  }
};
