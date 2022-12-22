import knex from 'knex'
import connection from '../config/configMySql.js'

const KnexMySql = knex(connection)

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

