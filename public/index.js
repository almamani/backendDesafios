const socket = io.connect();

//PRODUCTOS - Registro
const addProduct = (e) => {
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("producto", product);
  document.getElementById("registro").reset();
  return false;
};

////PRODUCTOS - Listado
const renderProducts = (products) => {
  return fetch("productos.hbs")
    .then((res) => res.text())
    .then((tabla) => {
      const template = Handlebars.compile(tabla);
      const html = template({ products });
      document.getElementById("productos").innerHTML = html;
    });
};

socket.on("productos", (productos) => {
  renderProducts(productos);
});

//CHAT --Form Ingreso
const addMessage = (e) => {
  const usr = document.getElementById("username").value;
  const msj = document.getElementById("mensaje").value;
  if (!usr) {
    Swal.fire({
      title: "Error!",
      text: "Ingresa tu E_mail para utilizar el chat",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    if (!msj) {
      Swal.fire({
        title: "Error!",
        text: "Ingresa un mensaje",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      const message = {
        author: usr,
        text: msj,
      };
      document.getElementById("mensaje").value = " ";
      mensaje.focus();
      socket.emit("newMensaje", message);
    }
  }
  return false;
};

//CHAT --Mostrar Mensajes
const renderMessages = (msjs) => {
  const html = msjs
    .map((msj) => {
      return `
            <div>
                <b style="color:blue;">${msj.author}</b>
                [<span style="color:brown;">${msj.date}</span>] :
                <i style="color:green;">${msj.text}</i>
            </div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
};

socket.on("mensajes", (data) => {
  renderMessages(data);
});
