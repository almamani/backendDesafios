import path from "path";
import { Router } from "express";
const infoRouter = new Router();


//argumentos de entrada
const argumentos = process.execArgv;
const plataforma = process.platform;
const version = process.version;
const memoria = process.memoryUsage();
const pathExe = process.execPath;
const processId = process.pid;
const carpeta = process.cwd();


infoRouter.get("/info", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/info.ejs"), {
    argumentos: argumentos,
    plataforma: plataforma,
    version: version,
    memoria: memoria.rss,
    pathExe: pathExe,
    processId: processId,
    carpeta: carpeta
  });
});

export default infoRouter;
