import mongoose from "mongoose";
import Config from "../config.js";
await mongoose.connect(Config.mongodb.cnxStr);

class ContenedorMongoDb {
  constructor(coleccion, esquema) {
    this.col = mongoose.model(coleccion, esquema);
  }

  async getAll() {
    try {
      const objets = await this.col.find();
      return objets;
    } catch (err) {
      console.error(err);
    }
  }

  async getById(id) {
    try {
      const objets = await this.col.findOne({ _id: id });
      return objets;
    } catch (err) {
      console.error(err);
    }
  }

  async save(objet) {
    try {
      await this.col.create(objet);
      const newId = await this.col
        .find({}, { _id: 1 })
        .sort({ _id: -1 })
        .limit(1);
      return newId;
    } catch (e) {
      console.log(e);
    }
  }

  async changeById(elem) {
    const { id } = elem;
    try {
      const found = await this.col.find({ _id: id });

      if (!found) {
        found = null;
      } else {
        await this.col.replaceOne({ _id: id }, elem);
      }
      return found;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteById(id) {
    let found = await this.col.find({ _id: id });
    try {
      if (!found) {
        found = null;
      } else {
        await this.col.deleteOne({ _id: id });
      }
      return found;
    } catch (err) {
      console.error(err);
    }
  }
}

export default ContenedorMongoDb;
