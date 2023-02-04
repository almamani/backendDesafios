import ProductosDaoMongoDb from "../daos/productosDaoMongo.js";

const productsArte = new ProductosDaoMongoDb();

export const getAllProducts = () => {
  const products = productsArte.getAll();
  return products;
};

export const getProductsById = ({ id }) => {
  const found = productsArte.getById(id);
  if (found) {
    return found;
  } else {
    throw new Error("Product not found.");
  }
};

export const saveProduct = ({ datos }) => {
  const newProduct = productsArte.save(datos);
  return newProduct;
};

export const updateProduct = async ({ id, datos }) => {
  const updatedProduct = await productsArte.changeById(id, datos);
  if (updatedProduct) {
    return updatedProduct;
  } else {
    throw new Error("Product not found.");
  }
};

export const deleteProduct = async ({ id }) => {
  const deletedProduct = await productsArte.deleteById(id);
  return deletedProduct;
  /*if (deletedProduct) {
    return deletedProduct;
  } else {
    throw new Error("Product not found.");
  }*/
};
