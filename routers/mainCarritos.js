import { Router } from "express";
import { CarritosDao } from "../daos/index.js";

const router = Router();

const carsArte = CarritosDao;

router.post("/", async (req, res) => {
  try {
    const timestamp = new Date();
    const products = [];
    const newId = await carsArte.save({ timestamp, products });
    res.send("El Id del nuevo carrito es:" + " " + newId);
  } catch (error) {
    res.send({ error: true });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const found = await carsArte.deleteById(id);
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
    let found = await carsArte.getById(id);
    if (found) {
      const { products } = found;
      res.send(products);
    } else {
      res.send({ error: "Carrito no encontrado" });
    }
  } catch {
    res.send({ error: true });
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
    await carsArte.saveProducts(
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
    const found = await carsArte.deleteProdById(id, id_prod);
    if (found) {
      res.send("Producto Eliminado");
    } else {
      res.send({ error: "producto no encontrado" });
    }
  } catch (error) {
    res.send({ error: true });
  }
});

export default router;
