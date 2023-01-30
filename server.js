import httpServer from "./app.js";
import * as dotenv from "dotenv";
import cluster from "cluster";
import { cpus } from "os";
import ParsedArgs from "minimist";

import { DBConnect } from "./config/configMongoDb.js";

dotenv.config();
const cpu = cpus();

// INICIO SERVIDOR -----------------------------------
const options = {
  alias: {
    m: "MODO",
  },
  default: {
    MODO: "FORK",
  },
};

const argv = process.argv.slice(2);
const { MODO } = ParsedArgs(argv, options);
const PORT = process.env.PORT || 8080;

if (MODO === "CLUSTER") {
  if (cluster.isPrimary) {
    console.log(`Primary: ${process.pid}`);
    for (let i = 0; i < cpu.length; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker whit id: ${worker.process.pid} killed`);
      cluster.fork();
    });
  } else {
    DBConnect(() => {
      const connectedServer = httpServer.listen(PORT, () => {
        console.log(
          `Servidor http escuchando en el puerto ${
            connectedServer.address().port
          } en modo ${MODO} en el worker ${process.pid}`
        );
      });
      connectedServer.on("error", (error) =>
        console.log(`Error en servidor ${error}`)
      );
    });
  }
} else {
  DBConnect(() => {
    const connectedServer = httpServer.listen(PORT, () => {
      console.log(
        `Servidor http escuchando en el puerto ${
          connectedServer.address().port
        } en modo ${MODO} en el worker ${process.pid}`
      );
    });
    connectedServer.on("error", (error) =>
      console.log(`Error en servidor ${error}`)
    );
  });
}
