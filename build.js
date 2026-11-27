#!/usr/bin/env node
/**
 * Regenera los bloques editables de index.html a partir de datos/*.json.
 * Reemplaza lo que haya entre <!--bloque--> y <!--/bloque--> dentro de cada
 * elemento [data-bloque="nombre"]. Uso:   node build.js
 * (El sitio publicado no necesita este script; solo se corre al editar en local.)
 */
const fs = require("fs");
const path = require("path");
const R = require("./js/renderers.js");

const RAIZ = __dirname;
const leer = (n) => JSON.parse(fs.readFileSync(path.join(RAIZ, "datos", n + ".json"), "utf8"));
const PAGINAS = ["index.html", "privacidad.html"];
const archivoIndex = path.join(RAIZ, "index.html");
let html = fs.readFileSync(archivoIndex, "utf8");

const medios = (html.match(/<html[^>]*data-medios="([^"]*)"/) || [])[1] || "";
const sitio = leer("sitio");
const ctx = { medios, sitio };
const cache = {};

let total = 0;
for (const pagina of PAGINAS) {
  const archivo = path.join(RAIZ, pagina);
  let contenido = fs.readFileSync(archivo, "utf8");
  for (const [nombre, fn] of Object.entries(R.bloques)) {
    const re = new RegExp('(data-bloque="' + nombre + '"[^>]*>)<!--bloque-->[\\s\\S]*?<!--/bloque-->');
    if (!re.test(contenido)) continue;
    const datos = cache[R.ARCHIVO[nombre]] || (cache[R.ARCHIVO[nombre]] = leer(R.ARCHIVO[nombre]));
    contenido = contenido.replace(re, (_, abre) => abre + "<!--bloque-->\n" + fn(datos, ctx) + "\n<!--/bloque-->");
    total++;
  }
  fs.writeFileSync(archivo, contenido);
}
console.log("Listo:", total, "bloques regenerados en", PAGINAS.join(" y "));
