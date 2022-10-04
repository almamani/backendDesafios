const express = require("express");
const { Router } = express;
const router = Router();

const { Carts } = require("./class/classCarts");
const cartsArte = new Carts("./data/carts.json");

router.post("/", async (req, res) => {
  try {
    const timestamp = new Date().toLocaleString();
    const newId = await cartsArte.saveCart(timestamp);
    res.send("El Id del nuevo carrito es:" + " " + newId);
  } catch (error) {
    res.send({ error: true });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const found = await cartsArte.deleteCartById(id);
    if (found) {
      res.send("Carrito Eliminado");
    } else {
      res.send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

router.get("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    const found = await cartsArte.getCart(id);
    if (found) {
      res.send(found);
    } else {
      res.send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

// Ruta agregarda para cargar los ID de carritos en el Front
router.get("/allId", async(req, res) => {
  try {
    const idCarts = await cartsArte.getAllId();
    return res.send(idCarts)      

  } catch (error) {
      res.send({ error: true});
  }
});

router.post("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_prod,
      timestamp,
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
    } = req.body;
    await cartsArte.saveProducts(
      id,
      id_prod,
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

router.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    await cartsArte.deleteProdById(id, id_prod);
    res.send("Producto Eliminado");
  } catch (error) {
    res.send({ error: true });
  }
});

module.exports = router;
