const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const socket = io.connect();


//PRODUCTOS - Listado
document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch("/api/productos-test");
    const data = await res.json();
    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
};

const renderProducts = (products) => {
  return fetch("productos.hbs")
    .then((res) => res.text())
    .then((tabla) => {
      const template = Handlebars.compile(tabla);
      const html = template({ products });
      document.getElementById("productos").innerHTML = html;
    });
};

//CHAT --Form Ingreso
const addMessage = (e) => {
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const alias = document.getElementById("alias").value;
  const avatar = document.getElementById("avatar").value;
  const msj = document.getElementById("mensaje").value;
  const message = {
    text: msj,
    email: email,
    name: name,
    lastName: lastName,
    age: age,
    alias: alias,
    avatar: avatar,
  };
  document.getElementById("mensaje").value = " ";
  mensaje.focus();
  socket.emit("newMensaje", message);

  return false;
};

//CHAT --Mostrar Mensajes
const renderMessages = (msjs, compresion) => {
  const html = msjs.mensajes
    .map((msj) => {
      return `
            <div>
                <b style="color:blue;">${msj.author.email}</b>
                [<span style="color:brown;">${msj.date}</span>] :
                <i style="color:green;">${msj.text}</i>
                <img width="50" src=${msj.author.avatar} alt="avatar">

            </div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
  document.getElementById("porcentaje").innerHTML = `<h4 style="color:brown;">Porcentaje de Compresión: ${compresion}%</h4>`;
};

socket.on("mensajes", (data) => {
  //Desnormalizar el data que viene normalizado
  const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
  const postShema = new schema.Entity("post", {
    author: authorSchema,
  });
  const postsSchema = new schema.Entity("posts", {
    mensajes: [postShema],
  });

  const denormData = denormalize(
    data.result,
    postsSchema,
    data.entities
  );

  // Mostrando Resultado de Compresión / Descompresión por consola
  console.log(" ----------- OBJETO NORMALIZADO -------------");
  console.log(data);
  console.log(" ----------- OBJETO DESNORMALIZADO -------------");
  console.log(denormData);
  console.log(" ----------- ESTADÍSTICAS NORMALIZ -------------");
  const longNormalized = JSON.stringify(data).length;
  const longDenormalized = JSON.stringify(denormData).length;
  const compresion = parseInt((longNormalized / longDenormalized) * 100);

  console.log(`Longitud obj. normalizado: ${longNormalized}`);
  console.log(`Longitud obj. denormalizado: ${longDenormalized}`);
  console.log(`Porcentaje de compresion:${compresion}%`);

  renderMessages(denormData, compresion);

});
