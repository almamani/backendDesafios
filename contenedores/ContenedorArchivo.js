import fs from "fs";

class ContenedorArchivo {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const objets = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const objetsParse = JSON.parse(objets);
      return objetsParse;
    } catch (err) {
      console.error(err);
    }
  }

  async getById(id) {
    try {
      const objets = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const objetsParse = JSON.parse(objets);
      let found = objetsParse.find((objet) => objet.id === id);
      if (!found) {
        found = null;
      }
      return found;
    } catch (err) {
      console.error(err);
    }
  }

  async save(objet) {
    try {
      const objets = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const objetsParse = JSON.parse(objets);
      const numId = objetsParse.length + 1;
      const newId = numId.toString();
      const newObjet = { id: newId, ...objet };
      objetsParse.push(newObjet);
      const objetsString = JSON.stringify(objetsParse);
      await fs.promises.writeFile(`${this.archivo}`, objetsString);
      return newObjet.id;
    } catch (err) {
      console.error(err);
    }
  }

  async changeById(elem) {
    const { id } = elem;
    try {
      const objs = await fs.promises.readFile(this.archivo, "utf-8");
      const objsParse = JSON.parse(objs);
      let findItem = objsParse.find((obj) => obj.id === id);
      if (!findItem) {
        findItem = null;
      } else {
        const filterItem = objsParse.filter((obj) => obj.id != id);
        filterItem.push(elem);
        const objString = JSON.stringify(filterItem);
        await fs.promises.writeFile(this.archivo, objString);
      }
      return findItem;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteById(id) {
    const objets = await fs.promises.readFile(`${this.archivo}`, "utf-8");
    let objetsParse = JSON.parse(objets);
    let found = objetsParse.find((objet) => objet.id === id);
    try {
      if (!found) {
        found = null;
      } else {
        objetsParse = objetsParse.filter((objet) => objet.id != id);
        const objetsString = JSON.stringify(objetsParse);
        await fs.promises.writeFile(`${this.archivo}`, objetsString);
      }
      return found;
    } catch (err) {
      console.error(err);
    }
  }
}

export default ContenedorArchivo;
