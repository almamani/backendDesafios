const fs = require("fs");

class Message {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const dataParse = JSON.parse(data);
      return dataParse;
    } catch (err) {
      console.error(err);
    }
  }

  async save(date, text, email, name, lastName, age, alias, avatar) {
    try {
      const data = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const dataParse = JSON.parse(data);
      const newId = dataParse.mensajes.length + 1;
      const newMessage = {
        id: `${newId}`,
        date,
        text,
        author: {
          email,
          name,
          lastName,
          age,
          alias,
          avatar,
        },
      };
      dataParse.mensajes.push(newMessage);
      const dataString = JSON.stringify(dataParse);
      await fs.promises.writeFile(`${this.archivo}`, dataString);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  Message,
};
