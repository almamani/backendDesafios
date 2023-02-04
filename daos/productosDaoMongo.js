import ContenedorMongoDb from "../contenedores/contenedorMongoDb.js";

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("productos", {
      title: { type: String, required: true },
      description: { type: String, required: true },
      code: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProductosDaoMongoDb;
