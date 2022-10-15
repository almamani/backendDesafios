const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { sqLiteConfig } = require("./configSqLite.js");
const { connection } = require("./configMySql");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const { Product } = require("./classProduct");
const { Message } = require("./classMessage");

const productArte = new Product(connection, "productos");
const messagesUsers = new Message(sqLiteConfig, "mensajes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  // PRODUCTOS
  const products = await productArte.getAll();
  socket.emit("productos", products);

  socket.on("producto", async (data) => {
    await productArte.save(data.title, data.price, data.thumbnail);
    const products = await productArte.getAll();
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
