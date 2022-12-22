import Product from "../class/classProduct.js";
import connection from "../config/configMySql.js";

const productArte = new Product(connection, "productos");
const products = await productArte.getAll();

export default async function socketProductos(socket, sockets) {
    const products = await productArte.getAll();
    socket.emit("productos", products);
  
    socket.on("producto", async (data) => {
      await productArte.save(data.title, data.price, data.thumbnail);
      const products = await productArte.getAll();
      sockets.emit("productos", products);
    });
}