const fs = require("fs");

class Products {
  constructor(archivo) {
    this.archivo = archivo;
  }
  
  async getAll() {
    try {
      const products = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const productsParse = JSON.parse(products);
      return productsParse;
    } catch (err) {
      console.error(err);
    }
  }

  async getById(id) {
    try {
      const products = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const productsParse = JSON.parse(products);
      let found = productsParse.find((product) => product.id === id);
      if (!found) {
        found = null;
      }
      return found;
    } catch (err) {
      console.error(err);
    }
  }

  async save(timestamp, title, description, code, thumbnail, price, stock) {
    try {
      const products = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const productsParse = JSON.parse(products);
      const newId = productsParse.length + 1;
      const newProduct = {
        id: `${newId}`,
        timestamp,
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
      };
      productsParse.push(newProduct);
      const productsString = JSON.stringify(productsParse);
      await fs.promises.writeFile(`${this.archivo}`, productsString);
    } catch (err) {
      console.error(err);
    }
  
  }


  async changeById(id, timestamp, title, description, code, thumbnail, price, stock) {
    try {
      const products = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      let productsParse = JSON.parse(products);
      let found = productsParse.find((product) => product.id === id);
      if (!found) {
        found = null;
      } else {
        const index = productsParse.indexOf(found);
        const aux = [...productsParse];
        aux[index].timestamp = timestamp;
        aux[index].title = title;
        aux[index].description = description;
        aux[index].code = code;
        aux[index].thumbnail = thumbnail;
        aux[index].price = price;
        aux[index].stock = stock;
        productsParse = aux;
        const productsString = JSON.stringify(productsParse);
        await fs.promises.writeFile(`${this.archivo}`, productsString);
      }
      return found;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteById(id) {
    const products = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    let productsParse = JSON.parse(products);
    let found = productsParse.find((product) => product.id === id);
    try {
      if (!found) {
        found = null;
      } else {
        productsParse = productsParse.filter((product) => product.id != id);
        const productsString = JSON.stringify(productsParse);
        await fs.promises.writeFile(`${this.archivo}`, productsString);
      }
       return found;
     } catch (error) {
      console.error(err)
    }
    
  }
  


}
  
  module.exports = {
    Products,
  };
  