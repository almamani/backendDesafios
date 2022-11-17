const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const socket = io.connect();

//PRODUCTOS - Registro
const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("producto", product);
  formAgregarProducto.reset();
});

//PRODUCTOS - Listado
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

//CHAT - Form Ingreso
const email = document.getElementById("email");
const name = document.getElementById("name");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const alias = document.getElementById("alias");
const avatar = document.getElementById("avatar");
const msj = document.getElementById("mensaje");

const formPublicarMensaje = document.getElementById("formPublicarMensaje");
formPublicarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();
  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.value) {
        email.focus();
        return (errorEmail.textContent = "Complete este campo");
    } else {
        if (!regEmail.test(email.value)) {
            email.value = "";
            email.focus();
            return (errorEmail.textContent = "Formato de Email no válido");
        } else {
            errorEmail.textContent = "";
        }
        console.log("Mensaje enviado")
    }
    if (!name.value) {
        name.focus();
        return (errorName.textContent = "Complete este campo")
    } else {
        name.focus();
        errorName.textContent = "";
    }
    if (!lastName.value) {
        lastName.focus();
        return (errorLastName.textContent = "Complete este campo")
    } else {
        lastName.focus();
        errorLastName.textContent = "";
    }
    if (!age.value) {
        age.focus();
        return (errorAge.textContent = "Complete este campo")
    } else {
        age.focus();
        errorAge.textContent = "";
    }
    if (!alias.value) {
        alias.focus();
        return (errorAlias.textContent = "Complete este campo")
    } else {
        alias.focus();
        errorAlias.textContent = "";
    }
    if (!avatar.value) {
        avatar.focus();
        return (errorAvatar.textContent = "Complete este campo")
    } else {
        avatar.focus();
        errorAvatar.textContent = "";
    }
    if (!mensaje.value){
        mensaje.focus();
        return (errorMsj.textContent = "Complete este campo")
    } else {
        mensaje.focus();
        errorMsj.textContent = "";
    }

 
  const message = {
    text: msj.value,
    email: email.value,
    name: name.value,
    lastName: lastName.value,
    age: age.value,
    alias: alias.value,
    avatar: avatar.value,
  };
  mensaje.value="";
    mensaje.focus();
    socket.emit("newMensaje", message);
});

//CHAT - Mostrar Mensajes
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
  document.getElementById(
    "porcentaje"
  ).innerHTML = `<h4 style="color:brown;">Porcentaje de Compresión: ${compresion}%</h4>`;
};


socket.on("mensajes", (data) => {
  //Desnormalizar el data que viene normalizado
  const authorSchema = new schema.Entity(
    "authors",
    {},
    { idAttribute: "email" }
  );
  const postShema = new schema.Entity("post", {
    author: authorSchema,
  });
  const postsSchema = new schema.Entity("posts", {
    mensajes: [postShema],
  });

  const denormData = denormalize(data.result, postsSchema, data.entities);

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
