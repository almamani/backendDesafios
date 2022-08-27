const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const products = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const productsParse = JSON.parse(products);
      if (productsParse.length > 0) {
        return productsParse;
      } else {
        return `No se encuentran productos en el archivo`;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getById(id) {
    try {
      const products = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const productsParse = JSON.parse(products);
      let found = productsParse.find((product) => parseInt(product.id) === id);
      if (!found) {
        found = null;
      }
      return found;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  Contenedor,
};
