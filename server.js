import express from "express";
import * as dotenv from "dotenv";

import { Server as HttpServer } from "http";

import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { DBConnect } from "./config/configMongoDb.js";

import homeRouter from "./routers/home.js";
import mainProductos from "./routers/mainProductos.js";
import mainCarritos from "./routers/mainCarritos.js";

dotenv.config();
const app = express();
const httpServer = new HttpServer(app);
const PORT = process.env.PORT || 3000;

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

//RUTAS -----------------------------------------------------------
app.use(homeRouter);
app.use("/api/productos", mainProductos);
app.use("/api/carrito", mainCarritos);

// CONTROL RUTAS INVALIDAS ---------------------------------------------
app.get("*", (req, res) => {
  const route = req.originalUrl;
  const method = req.method;
  res.status(404).json({
    error: -2,
    descripcion: `Ruta: ${route} Método: ${method}  No implementada`,
  });
});

app.post("*", (req, res) => {
  const route = req.originalUrl;
  const method = req.method;
  res.status(404).json({
    error: -2,
    descripcion: `Ruta: ${route} Método: ${method}  No implementada`,
  });
});

app.put("*", (req, res) => {
  const route = req.originalUrl;
  const method = req.method;
  res.status(404).json({
    error: -2,
    descripcion: `Ruta: ${route} Método: ${method}  No implementada`,
  });
});

app.delete("*", (req, res) => {
  const route = req.originalUrl;
  const method = req.method;
  res.status(404).json({
    error: -2,
    descripcion: `Ruta: ${route} Método: ${method}  No implementada`,
  });
});

// INICIO SERVIDOR -----------------------------------
DBConnect(() => {
  const connectedServer = httpServer.listen(8080, () => {
    console.log(
      `Servidor http escuchando en el puerto ${connectedServer.address().port}`
    );
  });
  connectedServer.on("error", (error) =>
    console.log(`Error en servidor ${error}`)
  );
});
