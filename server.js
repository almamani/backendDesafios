const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", require("./productos"));

app.use("/", express.static(__dirname + "/public"));

const server = app.listen(8080, () => {
  console.log("Servidor Iniciado");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
