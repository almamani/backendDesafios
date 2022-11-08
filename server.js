const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", express.static(__dirname + "/public"));

// PRODUCTOS
app.use("/api/productos-test", require("./appProducts.js"));

// MENSAJES
const { Message } = require("./class/classMessage");
const messagesUsers = new Message("./data/mensajes.json");

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  //CHAT
  messages = await messagesUsers.getAll();
  //Normalizacion
  const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
  const postShema = new schema.Entity("post", {
    author: authorSchema,
  });
  const postsSchema = new schema.Entity("posts", {
    mensajes: [postShema],
  });
  const normMessages = normalize(messages, postsSchema);

  //Emisión
  socket.emit("mensajes", normMessages);

  //Recepción
  socket.on("newMensaje", async (data) => {
    const date = new Date().toLocaleString();
    await messagesUsers.save(
      date,
      data.text,
      data.email,
      data.name,
      data.lastName,
      data.age,
      data.alias,
      data.avatar
    );
    
    messages = await messagesUsers.getAll();
    //Normalizacion
      const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
      const postShema = new schema.Entity("post", {
      author: authorSchema,
      });
      const postsSchema = new schema.Entity("posts", {
      mensajes: [postShema],
      });
    const normMessages = normalize(messages, postsSchema);

    // Post Emisión
    io.sockets.emit("mensajes", normMessages);
  });
});


const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(
    `Servidor conectado, escuchando el puerto: ${server.address().port} `
  );
});
server.on("error", (error) => {
  console.log(`Error en servidor ${error}`);
});
