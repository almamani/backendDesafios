const items = document.getElementById("items");
const selectCarrito = document.getElementById("cartSelect");
const encabCarrito = document.getElementById("encabCarrito");
const prodCarrito = document.getElementById("prodCarrito");
const templateCard = document.getElementById("template-card").content;
const templateEncabCarrito = document.getElementById(
  "template-encab-carrito"
).content;
const templateProdCarrito = document.getElementById(
  "template-prod-carrito"
).content;
const fragment = document.createDocumentFragment();
let carritoObjeto = [];

document.addEventListener("DOMContentLoaded", (e) => {
  fetchIdCarritos();
  fetchData();
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".card .btn-dark")) {
    fetchAgregarProductos(e.target.parentElement);
  }
  if (e.target.matches(".list-group-item .btn-danger")) {
    fetchEliminarProducto(e.target.parentElement);
  }
  if (e.target.matches("#agregarCarrito")) {
    fetchAgregarCarrito();
  }
  if (e.target.matches("#quitarCarrito")) {
    fetchEliminarCarrito(e.target.parentElement);
  }
  e.stopPropagation();
});

selectCarrito.addEventListener("change", () => {
  pintarCarrito();
});

//Traer Productos de la BD de productos
const fetchData = async () => {
  try {
    const res = await fetch("/api/productos");
    const data = await res.json();
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};

//Traer IDs de Carritos para cargar Select de Carritos
const fetchIdCarritos = async () => {
  try {
    const res = await fetch("/api/carrito/allId");
    const IdCarritos = await res.json();
    cargarCarritos(IdCarritos);
  } catch (error) {
    console.log(error);
  }
};

//Agregar Carrito Nuevo
const fetchAgregarCarrito = async () => {
  try {
    const res = await fetch("/api/carrito", { method: "POST" });
    fetchIdCarritos();
    pintarCarrito();
  } catch (error) {
    console.log(error);
  }
};

//Eliminar un Carrito
const fetchEliminarCarrito = async (objeto) => {
  const idCarrito = objeto.querySelector("#quitarCarrito").dataset.id;
  try {
    const res = await fetch(`/api/carrito/${idCarrito}`, {
      method: "DELETE",
    });
    fetchIdCarritos();
    encabCarrito.textContent = "";
    prodCarrito.textContent = "";
  } catch (error) {
    console.log(error);
  }
};

//Traer Productos de un carrito puntual
const fetchMostrarCarrito = async (carritoSelect) => {
  try {
    const res = await fetch(`/api/carrito/${carritoSelect}/productos`);
    carritoObjeto = await res.json();
    pintarProdCarrito();
  } catch (error) {
    console.log(error);
  }
};

//Agregar Productos al Carrito
const fetchAgregarProductos = async (objeto) => {
  try {
    let carritoSelect = document.getElementById("cartSelect").value;
    const url = `/api/carrito/${carritoSelect}/productos`;
    const producto = {
      id: carritoSelect,
      id_prod: objeto.querySelector(".btn-dark").dataset.id,
      timestamp: objeto.querySelector(".time").textContent,
      title: objeto.querySelector("h5").textContent,
      description: objeto.querySelector(".description").textContent,
      code: objeto.querySelector(".code").textContent,
      thumbnail: objeto.querySelector(".time").textContent,
      price: objeto.querySelector(".price span").textContent,
      stock: objeto.querySelector(".stock").textContent,
    };

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchMostrarCarrito(carritoSelect);
  } catch (error) {
    console.log(error);
  }
};

//Eliminar un Producto del Carrito
const fetchEliminarProducto = async (objeto) => {
  const carritoSelect = document.getElementById("cartSelect").value;
  console.log(objeto);
  const id_prod = objeto.querySelector(".btn-danger").dataset.id;
  try {
    const res = await fetch(
      `/api/carrito/${carritoSelect}/productos/${id_prod}`,
      {
        method: "DELETE",
      }
    );
    fetchMostrarCarrito(carritoSelect);
  } catch (error) {
    console.log(error);
  }
};

//Cargar Carritos en el Select
const cargarCarritos = (IdCarritos) => {
  const select = document.querySelector("#cartSelect");
  select.textContent = "";
  IdCarritos.forEach((IdCarrito) => {
    let opt = document.createElement("option");
    opt.value = IdCarrito;
    opt.text = IdCarrito;
    select.appendChild(opt);
  });
};

// Pintar productos
const pintarCards = (data) => {
  data.forEach((item) => {
    templateCard.querySelector("img").setAttribute("src", item.thumbnail);
    templateCard.querySelector("h5").textContent = item.title;
    templateCard.querySelector(".description").textContent = item.description;
    templateCard.querySelector(".code span").textContent = item.code;
    templateCard.querySelector(".time span").textContent = item.timestamp;
    templateCard.querySelector(".price span").textContent = item.price;
    templateCard.querySelector(".stock span").textContent = item.stock;
    templateCard.querySelector(".btn-dark").dataset.id = item.id_prod;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};

//Pintar Carrito - Traemos lo que tiene el carrito del archivo carts.json segun select carritos
const pintarCarrito = () => {
  encabCarrito.textContent = "";
  let carritoSelect = document.getElementById("cartSelect").value;
  templateEncabCarrito.querySelector("#id_carrito").textContent = carritoSelect;
  templateEncabCarrito.querySelector("#quitarCarrito").dataset.id =
    carritoSelect;
  const clone = templateEncabCarrito.cloneNode(true);
  fragment.appendChild(clone);
  encabCarrito.appendChild(fragment);
  fetchMostrarCarrito(carritoSelect);
};

//Pintar Productos del Carrito
const pintarProdCarrito = () => {
  prodCarrito.textContent = "";
  carritoObjeto.forEach((item) => {
    templateProdCarrito.querySelector("#title").textContent = item.title;
    templateProdCarrito.querySelector("#description").textContent =
      item.description;
    templateProdCarrito.querySelector("#price span").textContent = item.price;
    templateProdCarrito.querySelector(".btn-danger").dataset.id = item.id;
    const clone = templateProdCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  prodCarrito.appendChild(fragment);
};
