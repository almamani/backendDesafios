class Api {
  constructor() {
    this.products = [];
  }

  getAll() {
    let found;
    if (this.products.length > 0) {
      found = this.products;
    } else {
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
  }
}

module.exports = {
  Api,
};
