const express = require("express");
const app = express();

const { Api } = require("./claseApi");
const productArte = new Api();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/productos", (req, res) => {
  const products = productArte.getAll();
  res.render("pages/productos", { products });
});

app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;
  productArte.save(title, price, thumbnail);
  res.redirect("/");
});

const server = app.listen(8080, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
