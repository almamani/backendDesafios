import { Router } from "express";
const numberRouter = new Router();
import { fork } from "child_process";

numberRouter.get("/", (req, res) => {
  const child = fork("./childNumbers.js");
  const { cant } = req.query;
  let cantEnv;
  if (cant) {
    cantEnv = cant;
  } else {
    cantEnv = 100000000;
  }
  child.send(cantEnv);

  child.on("message", (message) => {
    res.send(message);
  });
});

numberRouter.get("/prueba", (req, res) => {
  res.send("Ruta de Prueba Ok");
});

export default numberRouter;
