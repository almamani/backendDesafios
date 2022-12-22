import { Router } from "express";
const numberRouter = new Router();

numberRouter.get("/", (req, res) => {
 
  const { cant } = req.query;
  let cantEnv;
  if (cant) {
    cantEnv = cant;
  } else {
    cantEnv = 100000000;
  }

  const randoms = list_random(cantEnv);
  res.send(randoms);
  
});

numberRouter.get("/prueba", (req, res) => {
  res.send("Ruta de Prueba Ok");
});

const list_random = (cantEnv) => {
  let lista = [];
  let randoms = {};
  for (let i = 1; i <= cantEnv; i++) {
    const min = Math.ceil(1);
    const max = Math.floor(1000);
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    lista.push(random);
  }

  randoms = lista.reduce(
    (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
    {}
  );

  return { randoms };
};

export default numberRouter;
