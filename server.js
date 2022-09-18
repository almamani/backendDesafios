const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const { Product } = require("./class/classProduct");
const { Message } = require("./class/classMessage");

const productArte = new Product();
const messagesUsers = new Message("./data/mensajes.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  // PRODUCTOS
  const products = productArte.getAll();
  socket.emit("productos", products);

  socket.on("producto", (data) => {
    productArte.save(data.title, data.price, data.thumbnail);
    const products = productArte.getAll();
    io.sockets.emit("productos", products);
  });

  //CHAT
  messages = await messagesUsers.getAll();
  socket.emit("mensajes", messages);

  socket.on("newMensaje", async (data) => {
    const date = new Date().toLocaleString();
    await messagesUsers.save(data.author, date, data.text);
    messages = await messagesUsers.getAll();
    io.sockets.emit("mensajes", messages);
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
