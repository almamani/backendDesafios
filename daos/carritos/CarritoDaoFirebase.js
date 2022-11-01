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
      await this.col.doc(id).update({
        products: products.filter((product) => product.id !== id_prod),
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default CarritoDaoFirebase;
