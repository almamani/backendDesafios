const express = require("express");
const handlebars = require("express-handlebars");

const { Api } = require("./claseApi");
const productArte = new Api();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "index",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", { layout: "registro" });
});

app.get("/productos", (req, res) => {
  const products = productArte.getAll();
  res.render("index", {
    layout: "productos",
    products: products,
  });
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
