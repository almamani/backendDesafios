const fs = require("fs");

class Message {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const messages = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const messagesParse = JSON.parse(messages);
      return messagesParse;
    } catch (err) {
      console.error(err);
    }
  }

  async save(author, date, text) {
    try {
      const messages = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const messagesParse = JSON.parse(messages);
      const newMessage = {
        author,
        date,
        text,
      };
      messagesParse.push(newMessage);
      const messagesString = JSON.stringify(messagesParse);
      await fs.promises.writeFile(`${this.archivo}`, messagesString);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  Message,
};
