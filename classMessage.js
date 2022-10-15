class Message {
  constructor(sqLiteConfig, table) {
    this.KnexMessages = require("knex")(sqLiteConfig);
    this.table = table;
  }

  async getAll() {
    try {
      return await this.KnexMessages.select("*").from(this.table);
    } catch (e) {
      throw new Error(e);
    }
  }

  async save(author, date, text) {
    try {
      const newMessage = {
        author,
        date,
        text,
      };
      return await this.KnexMessages.insert(newMessage).into(this.table);
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = {
  Message,
};
