class Api {
  constructor() {
    this.products = [];
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    let found = this.products.find((product) => product.id === id);
    if (!found) {
      found = null;
    }
    return found;
  }

  save(title, price, thumbnail) {
    const newId = this.products.length + 1;
    const newProduct = {
      id: `${newId}`,
      title,
      price,
      thumbnail,
    };
    this.products.push(newProduct);
    return newProduct.id;
  }

  changeById(id, title, price, thumbnail) {
    let found = this.products.find((product) => product.id === id);
    if (!found) {
      found = null;
    } else {
      const index = this.products.indexOf(found);
      const aux = [...this.products];
      aux[index].title = title;
      aux[index].price = price;
      aux[index].thumbnail = thumbnail;
      this.products = aux;
    }
    return found;
  }

  deleteById(id) {
    let found = this.products.find((product) => product.id === id);
    if (!found) {
      found = null;
    } else {
      this.products = this.products.filter((product) => product.id != id);
    }
    return found;
  }
}

module.exports = {
  Api,
};
