const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", require("./appProducts"));
app.use("/api/carrito", require("./appCars"));

app.get("*", (req, res) => {
  const route = req.originalUrl;
  const method = req.method;
  res.status(404).json({
    error: -2,
    descripcion: `Ruta: ${route} Método: ${method}  No implementada`,
  });
});

app.post("*", (req, res) => {
  const route = req.originalUrl;
  const method = req.method;
  res.status(404).json({
    error: -2,
    descripcion: `Ruta: ${route} Método: ${method}  No implementada`,
  });
});

app.put("*", (req, res) => {
  const route = req.originalUrl;
  const method = req.method;
  res.status(404).json({
    error: -2,
    descripcion: `Ruta: ${route} Método: ${method}  No implementada`,
  });
});

app.delete("*", (req, res) => {
  const route = req.originalUrl;
  const method = req.method;
  res.status(404).json({
    error: -2,
    descripcion: `Ruta: ${route} Método: ${method}  No implementada`,
  });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor Iniciado, escuchando el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en el servidor ${error}`));
