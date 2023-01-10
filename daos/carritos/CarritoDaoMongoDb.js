import { Schema } from "mongoose";
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

const products = new Schema({
  id: { type: String, required: true },
  timestamp: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

class CarritoDaoMongoDb extends ContenedorMongoDB {
  constructor() {
    super("carritos", {
      timestamp: { type: Date, required: true },
      products: [products],
    });
  }
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
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProdById(id, id_prod) {
    try {
      await this.col.updateOne(
        { _id: id },
        { $pull: { products: { _id: id_prod } } }
      );
    } catch (e) {
      console.log(e);
    }
  }
}

export default CarritoDaoMongoDb;
