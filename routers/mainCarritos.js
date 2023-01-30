import { Router } from "express";
import DAOFactory from "../daos/DAOFactory.js";
import logger from "../config/configLoggers.js";

import { client } from "../config/configTwilio.js";
import { transporter } from "../config/configNodemailer.js";

import CartDTO from "../dto/cartDto.js"

import * as dotenv from "dotenv";
dotenv.config();

const email_admin = process.env.EMAIL_ADMIN;
const phone_admin = process.env.PHONE_ADMIN;

const router = Router();
const carsArte = DAOFactory.getCarritosDAO();

//AUTENTICACIÓN ------------------
const authMw = (req, res, next) => {
  req.isAuthenticated() ? next() : res.send({ error: "sin session" });
};

// Ruta Agregar Carrito p/ Usuario
router.post("/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const timestamp = new Date();
    const id_user = idUser;
    const products = [];
    const newId = await carsArte.save({ timestamp, id_user, products });
    res.send({ IdNewCarrito: newId });
  } catch (err) {
    logger.error(`Error- MainCarrito - Ruta Post Carrito: ${err}`);
  }
});

// Ruta Borrar Carrito
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const found = await carsArte.deleteById(id);
    res.send("Carrito Eliminado");
  } catch (err) {
    logger.error(`Error- MainCarrito - Ruta Delete Carrito: ${err}`);
  }
});

// Ruta Buscar Productos de un Carrito determinado
router.get("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    let found = await carsArte.getById(id);
    if (found) {
      const { products } = found;
      const totalCarrito = CartDTO(products);
      console.log(totalCarrito);
      res.send(products);
    } else {
      logger.error(
        `Error- MainCarrito - Ruta Buscar Productos Carrito - Carrito no encontrado: ${err}`
      );
    }
  } catch (err) {
    logger.error(`Error- MainCarrito - Ruta Buscar Productos Carrito: ${err}`);
  }
});

// Ruta Agregar un Producto a un Carrito determinado
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
  } catch (err) {
    logger.error(`Error- MainCarrito - Ruta Agregar Producto Carrito: ${err}`);
  }
});

// Borrar un producto de un carrito determinado
router.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    const found = await carsArte.deleteProdById(id, id_prod);
    res.send("Producto Eliminado");
  } catch (err) {
    logger.error(`Error- MainCarrito - Ruta Eliminar Producto Carrito: ${err}`);
  }
});

// Buscar el carrito de un usuario con una compra no finalizada
router.get("/idCarrito/:id_user", async (req, res) => {
  try {
    const { id_user } = req.params;
    let found = await carsArte.getCarritoByUsuario(id_user);
    if (found) {
      res.send(found);
    } else {
      res.send({ _id: null });
    }
  } catch (err) {
    logger.error(
      `Error- MainCarrito - Ruta Buscar Carrito de un Usuario: ${err}`
    );
  }
});

router.put("/finalizar/:id_user", async (req, res) => {
  try {
    const { id_user } = req.params;
    const name = req.user.name;
    const email = req.user.username;
    const telephone = req.user.phone;

    await carsArte.updateFinalizarCarritoBy(id_user);

    // Envío de Email al Usuario  del Pedido en Proceso
    await transporter.sendMail({
      from: "colleen.kozey@ethereal.email",
      to: email_admin,
      subject: `Nuevo pedido de ${name} - email: ${email}`,
      html: `<h4>Nuevo Pedido</h4>
           <ul>
              <li>Pedido del Usuario</li>
          </ul>`,
    });

    // Envío de Mensaje al Usuario Pedido en Proceso
    await client.messages.create({
      body: "Su pedido ha sido recibido y se encuentra en proceso",
      from: "+14344235115",
      to: `+${telephone}`,
    });

    // Envío de Whatsapp al Administrador
    await client.messages.create({
      body: `Nuevo pedido de ${name} - email: ${email}`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+${phone_admin}`,
    });
  } catch (err) {
    logger.error(
      `Error- MainCarrito - Ruta Actualizar Carrito Finalizar true: ${err}`
    );
  }
});

export default router;
