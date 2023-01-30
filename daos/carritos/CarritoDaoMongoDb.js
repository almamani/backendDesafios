import { Schema } from "mongoose";
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";
import logger from "../../config/configLoggers.js";

const products = new Schema({
  id_prod: { type: String, required: true },
  timestamp: { type: Date, required: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: false },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

class CarritoDaoMongoDb extends ContenedorMongoDB {
  constructor() {
    super("carritos", {
      timestamp: { type: Date, required: true },
      id_user: { type: String, required: true },
      finCompra: { type: Boolean, default: false },
      products: [products],
    });
  }

  // Guardar un Producto en un Carrito Puntual
  async saveProducts(
    id,
    id_prod,
    timestamp,
    title,
    description,
    code,
    thumbnail,
    price,
    stock
  ) {
    try {
      const newProduct = {
        id_prod,
        timestamp,
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
      };
      await this.col.findByIdAndUpdate(
        { _id: id },
        { $push: { products: newProduct } }
      );
    } catch (err) {
      logger.error(`Error- DaoCartMongo - Funcion save: ${err}`);
    }
  }

  // Borrar un Producto de un Carrito Puntual
  async deleteProdById(id, id_prod) {
    try {
      await this.col.updateOne(
        { _id: id },
        { $pull: { products: { _id: id_prod } } }
      );
    } catch (err) {
      logger.error(`Error- DaoCartMongo - Funcion deleteProdById: ${err}`);
    }
  }

  // Buscar un Carrito no Finalizado p/ un Usuario
  async getCarritoByUsuario(id) {
    try {
      const objets = await this.col.findOne({
        $and: [{ id_user: id }, { finCompra: false }],
      });
      return objets;
    } catch (err) {
      logger.error(`Error- DaoCartMongo - Funcion getCarritoByUsuario: ${err}`);
    }
  }

  // Actualizar Finalizado = true al finalizar una compra
  async updateFinalizarCarritoBy(id) {
    try {
      await this.col.updateOne(
        {
          $and: [{ id_user: id }, { finCompra: false }],
        },
        { $set: { finCompra: true } }
      );
    } catch (err) {
      logger.error(
        `Error- DaoCartMongo - Funcion updateFinalizarCarritoByUsuario: ${err}`
      );
    }
  }
}

export default CarritoDaoMongoDb;
