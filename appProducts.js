const express = require("express");
const { Router } = express;
const router = Router();

const { Products } = require("./class/classProducts");
const productsArte = new Products("./data/products.json");

const admin = true;

const authAdmin = (req, res, next) => {
  if (admin) {
    next();
  } else {
    const route = req.originalUrl;
    const method = req.method;
    res.status(401).json({
      error: -2,
      descripcion: `Ruta: ${route} Método: ${method}  No autorizada`,
    });
  }
};

router.get("/", async (req, res) => {
  try {
    products = await productsArte.getAll();
    return res.send(products);
  } catch (error) {
    res.send({ error: true });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const found = await productsArte.getById(id);
    if (found) {
      res.send(found);
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

router.post("/", authAdmin, async (req, res) => {
  const timestamp = new Date().toLocaleString();
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;
    await productsArte.save(
      timestamp,
      title,
      description,
      code,
      thumbnail,
      price,
      stock
    );
    return res.send("Producto Cargado");
  } catch (error) {
    res.send({ error: true });
  }
});

router.put("/:id", authAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { timestamp, title, description, code, thumbnail, price, stock } =
      req.body;
    const found = await productsArte.changeById(
      id,
      timestamp,
      title,
      description,
      code,
      thumbnail,
      price,
      stock
    );
    if (found) {
      res.send("Producto Modificado");
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const found = await productsArte.deleteById(id);
    if (found) {
      res.send("Producto Eliminado");
    } else {
      res.send({ error: "producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

module.exports = router;
