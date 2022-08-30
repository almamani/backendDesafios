const express = require("express");
const { Contenedor } = require("./claseContenedor.js");

const app = express();
const productArte = new Contenedor("productos.txt");

const getRandom = () => {
  min = Math.ceil(1);
  max = Math.floor(3);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

app.get("/", (req, res) => {
  res.end(`<h2>Desafío Servidor con Express</h2>`);
});

app.get("/productos", async (req, res) => {
  try {
    products = await productArte.getAll();
    return res.send(products);
  } catch (error) {
    res.send({ error: true });
  }
});

app.get("/productoRandom", async (req, res) => {
  try {
    idRandom = getRandom();
    proRandom = await productArte.getById(idRandom);
    return res.send(proRandom);
  } catch (error) {
    res.send({ error: true });
  }
});

const server = app.listen(8080, () => {
  console.log("Servidor Iniciado");
});
