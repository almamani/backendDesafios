import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("./data/products.json");
  }
}

export default ProductosDaoArchivo;
