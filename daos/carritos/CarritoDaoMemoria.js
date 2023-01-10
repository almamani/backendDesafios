import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";
class CarritoDaoMemoria extends ContenedorMemoria {
  saveProducts(id,id_prod,timestamp,title,description,code,thumbnail,price,stock) {
      let found = this.objets.find((car) => car.id === id);
      const index = this.objets.indexOf(found);
      const newProduct = {
        id: id_prod,
        timestamp,
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
      }
      this.objets[index].products.push(newProduct);
  }

  deleteProdById(id, id_prod) {
      let found = this.objets.find((car) => car.id === id);
      const index = this.objets.indexOf(found);
      this.objets[index].products = this.objets[index].products.filter(
        (product) => product.id != id_prod
      );
  }
  
}

export default CarritoDaoMemoria;
