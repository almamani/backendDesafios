import express from "express";
import connection from "./config/configMySql.js";

import cluster from "cluster";
import { cpus } from "os";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import session from "express-session";
import MongoStore from "connect-mongo";

import passport from "passport";

import { normalize, schema } from "normalizr";
import { DBConnect } from "./config/configMongoDb.js";

import homeRouter from "./routers/home.js";
import randomRouter from "./routers/random_products.js";
import numberRouter from "./routers/random_numbers.js";
import infoRouter from "./routers/info.js";
import ParsedArgs from "minimist";
import Message from "./class/classMessage.js";
import Product from "./class/classProduct.js";

import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);
const cpu = cpus();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

//SERVIDOR -----------------------------------------
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

//SOKET-----------------------------------
const messagesUsers = new Message("./data/mensajes.json");
const productArte = new Product(connection, "productos");

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  //SOKET - Productos
  const products = await productArte.getAll();
  socket.emit("productos", products);

  socket.on("producto", async (data) => {
    await productArte.save(data.title, data.price, data.thumbnail);
    const products = await productArte.getAll();
    io.sockets.emit("productos", products);
  });

  //SOKET - Chat
  let messages = await messagesUsers.getAll();
  //Normalizacion
  const authorSchema = new schema.Entity(
    "authors",
    {},
    { idAttribute: "email" }
  );
  const postShema = new schema.Entity("post", {
    author: authorSchema,
  });
  const postsSchema = new schema.Entity("posts", {
    mensajes: [postShema],
  });
  const normMessages = normalize(messages, postsSchema);

  //Emisión
  socket.emit("mensajes", normMessages);

  //Recepción
  socket.on("newMensaje", async (data) => {
    const date = new Date().toLocaleString();
    await messagesUsers.save(
      date,
      data.text,
      data.email,
      data.name,
      data.lastName,
      data.age,
      data.alias,
      data.avatar
    );

    messages = await messagesUsers.getAll();

    //Normalizacion
    const authorSchema = new schema.Entity(
      "authors",
      {},
      { idAttribute: "email" }
    );
    const postShema = new schema.Entity("post", {
      author: authorSchema,
    });
    const postsSchema = new schema.Entity("posts", {
      mensajes: [postShema],
    });
    const normMessages = normalize(messages, postsSchema);

    // Post Emisión
    io.sockets.emit("mensajes", normMessages);
  });
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
