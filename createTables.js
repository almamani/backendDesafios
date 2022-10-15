const { connection } = require("./configMySql");
const KnexMySql = require("knex")(connection);

const { sqLiteConfig } = require("./configSqLite.js");
const KnexSqLite = require("knex")(sqLiteConfig);

KnexMySql.schema
  .createTable("productos", (tablaProd) => {
    tablaProd.increments("id");
    tablaProd.string("title");
    tablaProd.integer("price");
    tablaProd.string("thumbnail");
  })
  .then(() => console.log("Tabla Productos Creada!"))
  .catch((e) => {
    console.log("error", e);
    throw e;
  })
  .finally(() => {
    KnexMySql.destroy();
  });

KnexSqLite.schema
  .createTable("mensajes", (tablaMsj) => {
    tablaMsj.increments("id");
    tablaMsj.string("author");
    tablaMsj.string("date");
    tablaMsj.string("text");
  })
  .then(() => console.log("Tabla Mensajes Creada!"))
  .catch((e) => {
    console.log("error", e);
    throw e;
  })
  .finally(() => {
    KnexSqLite.destroy();
  });
