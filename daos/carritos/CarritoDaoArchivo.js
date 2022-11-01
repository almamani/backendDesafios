import fs from "fs";
import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class CarritoDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("./data/carts.json");
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

export default CarritoDaoArchivo;
