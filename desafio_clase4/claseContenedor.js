const fs = require("fs");

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
      }

    async getAll(){
        try {
            const products = await fs.promises.readFile(
                `${this.archivo}`,
                "utf-8"
              );
              console.log(
                "Mostrar Todos los productos  ------------------------------------"
              );
              const productsParse = JSON.parse(products);
              if (productsParse.length > 0) {
                console.log(productsParse); 
              } else {
                console.log(`No se encuentran productos en el archivo`);
              }
                   
            } catch (err) {
                console.error(err);
            }   
    }

    async save(title, price, thumbnail) {
        try {
          const products = await fs.promises.readFile(
            `${this.archivo}`,
            "utf-8"
          );

          const productsParse = JSON.parse(products);
          const newId = productsParse.length + 1;
          const newProduct = {
            id: `${newId}`,
            title,
            price,
            thumbnail,
          };
          productsParse.push(newProduct);
          const productsString = JSON.stringify(productsParse);
          await fs.promises.writeFile(
            `${this.archivo}`,
            productsString);
            console.log(
              "Agregar Nuevo producto  ----------------------------------------"
            );
            console.log(`Se agregó el Producto con Id: ${newProduct.id}`); 
       } catch (err) {
          console.error(err);
       }
           
    }
    async getById(id) {
      try {
        const products = await fs.promises.readFile(
          `${this.archivo}`,
          "utf-8"
        );
        console.log(
          `Buscar Producto con Id: ${id}  -------------------------------------`
        );
        const productsParse = JSON.parse(products);
        let found = productsParse.find((product) => parseInt(product.id) === id);
        if (!found) {
          found = null;
        }
        console.log(found);
        
      } catch (err) {
        console.error(err);
      }
    }

    async deleteById(id) {
      try {
        const products = await fs.promises.readFile(
          `${this.archivo}`,
          "utf-8"
        );
        console.log(
          `Borrar Producto con Id: ${id}  -------------------------------------`
        );
        let productsParse = JSON.parse(products);
        let found = productsParse.find((product) => parseInt(product.id) === id);
        if (!found) {
          console.log(`El producto con id:${id} no existe`);
        } else {
          productsParse = productsParse.filter((product) => product.id != id);
          const productsString = JSON.stringify(productsParse);
          await fs.promises.writeFile(
            `${this.archivo}`,
            productsString);
      }

      } catch (err) {
        console.error(err);
      }
    }
    
    async deleteAll(){
      try {
        const products = await fs.promises.readFile(
          `${this.archivo}`,
          "utf-8"
        );

        let productsParse = JSON.parse(products);
        if (productsParse.length = 0) {
          console.log("El archivo ya está vacío");
        }else {
          console.log(
            `Borrar todos los productos  -------------------------------------`
          );
          productsParse = [];
          const productsString = JSON.stringify(productsParse);
          await fs.promises.writeFile(
            `${this.archivo}`,
           productsString);
         }
        
      } catch (err) {
        console.log(err);
      }
}

    async deleteAll1() {
      console.log(
        `Borrar todos los productos  -------------------------------------`
      );
      const products = [];
      const productsString = JSON.stringify(products);
          try {
            await fs.promises.writeFile(
              `${this.archivo}`,
              productsString);
          } catch (err) {
            console.log(err);
          }
    }

}

module.exports = Contenedor;

