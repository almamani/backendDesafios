import express from "express";
import connection from "./config/configMySql.js";

import cluster from "cluster";
import { cpus } from "os";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
import socketProductos from "./socket/productos.js"
import socketMensajes from "./socket/mensajes.js"

import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { DBConnect } from "./config/configMongoDb.js";

import homeRouter from "./routers/home.js";
import randomRouter from "./routers/random_products.js";
import numberRouter from "./routers/random_numbers.js";
import infoRouter from "./routers/info.js";
import ParsedArgs from "minimist";

import logger from "./config/configLoggers.js";

import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);
const cpu = cpus();

//LOGGUER -------------------------------------
app.use((req, res, next) => {
  logger.info(`Petición Recibida: Método: ${req.method} Ruta: ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

//SESSION -----------------------------------------
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://almamani:nodejs2022@cluster0.fl6igxt.mongodb.net/ecommerce?retryWrites=true&w=majority",
      //ttl: 600000
    }),

    secret: "apr491rta0087w",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//RUTAS --------------------------------------
app.use(homeRouter);
app.use(randomRouter);
app.use(infoRouter);
app.use("/api/randoms", numberRouter);

app.all("*", (req, res) => {
  logger.warn(`Ruta Inexistente: Método ${req.method} Ruta: ${req.url}`);
  res.send({ error: true }).status(500);
});

//SOKET-----------------------------------
io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");
  socketProductos(socket, io.sockets);
  socketMensajes(socket, io.sockets);
});

// INICIO SERVIDOR -----------------------------------
const options = {
  alias: {
    p: "PORT",
    m: "MODO",
  },
  default: {
    PORT: 8080,
    MODO: "FORK",
  },
};

const argv = process.argv.slice(2);
const { PORT, MODO } = ParsedArgs(argv, options);

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
