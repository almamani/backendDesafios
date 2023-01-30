import express from "express";
import * as dotenv from "dotenv";

import { Server as HttpServer } from "http";

import session from "express-session";

import logger from "./config/configLoggers.js";

import MongoStore from "connect-mongo";
import passport from "passport";

import homeRouter from "./routers/home.js";
import mainProductos from "./routers/mainProductos.js";
import mainCarritos from "./routers/mainCarritos.js";

dotenv.config();
const app = express();
const httpServer = new HttpServer(app);

//LOGGUER -------------------------------------
app.use((req, res, next) => {
  logger.info(`Petición Recibida: Método: ${req.method} Ruta: ${req.url}`);
  next();
});

//MIDDLEWARES / VISTAS -----------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

//SERVIDOR -----------------------------------------
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/ecommerce",
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

//RUTAS -----------------------------------------------------------
app.use(homeRouter);
app.use("/api/productos", mainProductos);
app.use("/api/carrito", mainCarritos);

// CONTROL RUTAS INVALIDAS ---------------------------------------------
app.all("*", (req, res) => {
  logger.warn(`Ruta Inexistente: Método ${req.method} Ruta: ${req.url}`);
  res.send({ error: true }).status(500);
});

// INICIO SERVIDOR -----------------------------------
export default httpServer;
