import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";
import admin from "firebase-admin";
import { FieldValue } from "firebase/firestore";
import * as firestore from "firebase-admin";

class CarritoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
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
      const db = firestore.firestore();
      db.settings({ ignoreUndefinedProperties: true });
      const newProduct = {
        id_prod,
        timestamp,
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
      };

      await this.col
        .doc(id)
        .update("products", admin.firestore.FieldValue.arrayUnion(newProduct), {
          merge: true,
        });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProdById(id, id_prod) {
    try {
      const cart = await this.collection.doc(id).get();
      const { products } = cart.data();
      const filterProduct = products.filter((prod) => prod.id_prod != id_prod);
      await this.collection.doc(id).update("products", filterProduct);
    } catch (err) {
      console.error(err);
    }
  }
}

export default CarritoDaoFirebase;
