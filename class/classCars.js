const fs = require("fs");

class Cars {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async saveCar(timestamp) {
    try {
      const cars = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const carsParse = JSON.parse(cars);
      const newId = carsParse.length + 1;
      const newCar = {
        id: `${newId}`,
        timestamp,
        products: [],
      };
      carsParse.push(newCar);
      const carsString = JSON.stringify(carsParse);
      await fs.promises.writeFile(`${this.archivo}`, carsString);
      return newCar.id;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteCarById(id) {
    const cars = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    let carsParse = JSON.parse(cars);
    let found = carsParse.find((car) => car.id === id);

    try {
      if (!found) {
        found = null;
      } else {
        const index = carsParse.indexOf(found);
        carsParse[index].products = [];
        carsParse = carsParse.filter((car) => car.id != id);
        const carsString = JSON.stringify(carsParse);
        await fs.promises.writeFile(`${this.archivo}`, carsString);
      }
      return found;
    } catch (error) {
      console.error(err);
    }
  }

  async getCar(id) {
    try {
      const cars = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const carsParse = JSON.parse(cars);
      let products;
      let found = carsParse.find((car) => car.id === id);
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
      const cars = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const carsParse = JSON.parse(cars);
      let found = carsParse.find((car) => car.id === id);
      const index = carsParse.indexOf(found);
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
      carsParse[index].products.push(newProduct);
      const carsString = JSON.stringify(carsParse);
      await fs.promises.writeFile(`${this.archivo}`, carsString);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteProdById(id, id_prod) {
    try {
      const cars = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      let carsParse = JSON.parse(cars);
      let found = carsParse.find((car) => car.id === id);
      const index = carsParse.indexOf(found);
      carsParse[index].products = carsParse[index].products.filter(
        (product) => product.id != id_prod
      );
      const carsString = JSON.stringify(carsParse);
      await fs.promises.writeFile(`${this.archivo}`, carsString);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  Cars,
};
