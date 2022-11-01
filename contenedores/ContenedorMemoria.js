class ContenedorMemoria {
  constructor() {
    this.objets = []
  }

  getAll() {
    return this.objets;
  }

  getById(id) {
    let found = this.objets.find((objet) => objet.id === id);
    if (!found) {
      found = null;
    }
    return found;
  }

  save(objet) {
    const numId = this.objets.length + 1;
    const newId = numId.toString();
    const newObjet = { id: newId, ...objet };
    this.objets.push(newObjet);
    return newObjet.id;
  }

  changeById(elem) {
    const { id } = elem;
    let found = this.objets.find((objet) => objet.id === id);
    if (!found) {
      found = null;
    } else {
      const filterObj = this.objets.filter((objet) => objet.id != id);
      filterObj.push(elem);
      this.objets = filterObj;
    }
    return found;
  }

  deleteById(id) {
    let found = this.objets.find((objet) => objet.id === id);
    if (!found) {
      found = null;
    } else {
      this.objets = this.objets.filter((objet) => objet.id != id);
    }
    return found;
  }
}

export default ContenedorMemoria;
