const fs = require("fs");

class Carts {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async saveCart(timestamp) {
    try {
      const carts = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const cartsParse = JSON.parse(carts);
      const newId = cartsParse.length + 1;
      const newCart = {
        id: `${newId}`,
        timestamp,
        products: [],
      };
      cartsParse.push(newCart);
      const cartsString = JSON.stringify(cartsParse);
      await fs.promises.writeFile(`${this.archivo}`, cartsString);
      return newCart.id;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteCartById(id) {
    const carts = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    let cartsParse = JSON.parse(carts);
    let found = cartsParse.find((cart) => cart.id === id);

    try {
      if (!found) {
        found = null;
      } else {
        const index = cartsParse.indexOf(found);
        cartsParse[index].products = [];
        cartsParse = cartsParse.filter((cart) => cart.id != id);
        const cartsString = JSON.stringify(cartsParse);
        await fs.promises.writeFile(`${this.archivo}`, cartsString);
      }
      return found;
    } catch (error) {
      console.error(err);
    }
  }

  async getCart(id) {
    try {
      const carts = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const cartsParse = JSON.parse(carts);
      let products;
      let found = cartsParse.find((cart) => cart.id === id);
      if (!found) {
        products = null;
      } else {
        products = found.products;
      }
      return products;
    } catch (err) {
      console.error(err);
    }
  }

  // Funcion agregarda para cargar los ID de carritos en el Front
 async getAllId( ) {
  try {
      const carts = await fs.promises.readFile(`${this.archivo}`,"utf-8");    
      const cartsParse = JSON.parse(carts);
      const idCarts = cartsParse.map((cartParse) => cartParse.id);
      //const idCarts = cartsParse
      return idCarts;
  } catch (err) {
     console.error(err); 
  }
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
      const carts = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const cartsParse = JSON.parse(carts);
      let found = cartsParse.find((cart) => cart.id === id);
      const index = cartsParse.indexOf(found);
      const newProduct = {
        id: id_prod,
        timestamp,
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
      };
      cartsParse[index].products.push(newProduct);
      const cartsString = JSON.stringify(cartsParse);
      await fs.promises.writeFile(`${this.archivo}`, cartsString);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteProdById(id, id_prod) {
    try {
      const carts = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      let cartsParse = JSON.parse(carts);
      let found = cartsParse.find((cart) => cart.id === id);
      const index = cartsParse.indexOf(found);
      cartsParse[index].products = cartsParse[index].products.filter(
        (product) => product.id != id_prod
      );
      const cartsString = JSON.stringify(cartsParse);
      await fs.promises.writeFile(`${this.archivo}`, cartsString);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  Carts,
};
