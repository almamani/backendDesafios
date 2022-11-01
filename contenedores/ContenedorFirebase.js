import admin from "firebase-admin";
import Config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(Config.firebase),
});

const db = admin.firestore();

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.col = db.collection(nombreColeccion);
  }

  async getAll() {
    try {
      const query = this.col;
      const querySnapshot = await query.get();
      const objets = querySnapshot.docs;
      const found = objets.map((obj) => ({ id: obj.id, ...obj.data() }));
      return found;
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id) {
    try {
      const object = await this.col.doc(id).get();
      if (!object.exist) {
        throw new Error("Id No encontrado");
      } else {
        const data = doc.data();
        return { ...data, id };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async save(objet) {
    try {
      await this.col.add(objet);
    } catch (e) {
      console.log(e);
    }
  }

  async changeById(elem) {
    const { id } = elem;
    try {
      const find = await this.col.doc(id).set(elem);
      return find;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteById(id) {
    try {
      const find = await this.col.doc(id).get();
      if (!find) {
        find = null;
      } else {
        await this.col.doc(id).delete();
      }
      return find;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ContenedorFirebase;
