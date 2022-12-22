import path from "path";
import { Router } from "express";
import { cpus } from "os";
import compression from "compression";

const infoRouter = new Router();
const cpu = cpus();

//argumentos de entrada
const argumentos = process.execArgv;
const plataforma = process.platform;
const version = process.version;
const memoria = process.memoryUsage();
const pathExe = process.execPath;
const processId = process.pid;
const carpeta = process.cwd();
const procesadores = cpu.length;

/*infoRouter.get("/info-console", (req, res) => {
  console.log(`Argumentos: ${argumentos}
               Plataforma: ${plataforma}
               Version: ${version}
               Memoria: ${memoria}
               PathExe: ${pathExe}
               IdProcesador: ${processId}
               Carpeta: ${carpeta}
               Procesadores: ${procesadores}`);
  res.render(path.join(process.cwd(), "/views/pages/info.ejs"), {
    argumentos: argumentos,
    plataforma: plataforma,
    version: version,
    memoria: memoria.rss,
    pathExe: pathExe,
    processId: processId,
    carpeta: carpeta,
    procesadores: procesadores,
  });
});*/

infoRouter.get("/info", compression(), (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/info.ejs"), {
    argumentos: argumentos,
    plataforma: plataforma,
    version: version,
    memoria: memoria.rss,
    pathExe: pathExe,
    processId: processId,
    carpeta: carpeta,
    procesadores: procesadores,
  });
});

export default infoRouter;
