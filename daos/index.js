import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import CarritoDaoMemoria from "./carritos/CarritoDaoMemoria.js";
import ProductoDaoArchivos from "./productos/ProductosDaoArchivo.js";
import CarritoDaoArchivo from "./carritos/CarritoDaoArchivo.js";
import ProductosDaoMongoDb from "./productos/ProductosDaoMongoDb.js";
import CarritoDaoMongoDb from "./carritos/CarritoDaoMongoDb.js";
import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import CarritoDaoFirebase from "./carritos/CarritoDaoFirebase.js";

import * as dotenv from "dotenv";
dotenv.config();

const TIPO = process.env.TIPO;

let ProductosDao;
let CarritosDao;

switch (TIPO) {
  case "memoria":
    ProductosDao = new ProductosDaoMemoria();
    CarritosDao = new CarritoDaoMemoria();
    break;
  case "archivos":
    ProductosDao = new ProductoDaoArchivos();
    CarritosDao = new CarritoDaoArchivo();
    break;
  case "mongodb":
    ProductosDao = new ProductosDaoMongoDb();
    CarritosDao = new CarritoDaoMongoDb();
    break;
  case "firebase":
    ProductosDao = new ProductosDaoFirebase();
    CarritosDao = new CarritoDaoFirebase();
    break;
}

export { ProductosDao };
export { CarritosDao };
