import * as dotenv from "dotenv";
dotenv.config();
const db_client = process.env.DB_CLIENT_SQL;
const db_host = process.env.DB_HOST_SQL;
const db_port = Number(process.env.DB_PORT_SQL);
const db_user = process.env.DB_USER_SQL;
const db_name = process.env.DB_NAME_SQL;
const connection = {
  client: `${db_client}`,
  connection: {
    host: `${db_host}`,
    port: `${db_port}`,
    user: `${db_user}`,
    database: `${db_name}`,
  },
};
export default connection;

