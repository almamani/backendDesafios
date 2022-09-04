const express = require("express");
const { Router } = express;
const { Api } = require("./claseApi");
const router = Router();
const productArte = new Api();

router.get("/", (req, res) => {
  res.send(productArte.getAll());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const found = productArte.getById(id);
  if (found) {
    res.send(found);
  } else {
    res.send({ error: "producto no encontrado" });
  }
});

router.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newId = productArte.save(title, price, thumbnail);
  res.send("El Id del nuevo producto es:" + " " + newId);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  const found = productArte.changeById(id, title, price, thumbnail);
  if (found) {
    res.send("Producto Modificado");
  } else {
    res.send({ error: "producto no encontrado" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const found = productArte.deleteById(id);
  if (found) {
    res.send("Producto Eliminado");
  } else {
    res.send({ error: "producto no encontrado" });
  }
});

module.exports = router;
