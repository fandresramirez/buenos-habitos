/**
 * Generadores de HTML de los bloques editables (resenas, problemas, servicios,
 * galeria, FAQ, sedes y textos del hero/CTA). Los usan dos consumidores con la
 * misma logica, para que nunca difieran:
 *   - build.js (Node): deja el HTML ya escrito en index.html (SEO, sin parpadeo).
 *   - datos.js (navegador): actualiza esos bloques con los datos del repositorio.
 * ctx = { medios: URL base de las fotos subidas desde el panel, sitio: datos/sitio.json }
 */
(function (root, fabrica) {
  if (typeof module === "object" && module.exports) module.exports = fabrica();
  else root.BHRender = fabrica();
})(typeof self !== "undefined" ? self : this, function () {
  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /** Las fotos subidas desde el panel (img/fotos/) viven en el repositorio; el resto, en el servidor. */
  function foto(ctx, ruta) {
    ruta = ruta || "";
    return ctx.medios && /^\/?img\/fotos\//.test(ruta) ? ctx.medios + ruta.replace(/^\//, "") : ruta;
  }

  function waLink(ctx, mensaje) {
    const num = (ctx.sitio && ctx.sitio.whatsapp) || "593987444999";
    return "https://wa.me/" + num + (mensaje ? "?text=" + encodeURIComponent(mensaje) : "");
  }

  /** Mini-markdown: parrafos separados por linea en blanco, listas con "- ", **negrita**. */
  function md(texto) {
    const inline = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    return String(texto || "").split(/\n\s*\n/).map((b) => {
      const lineas = b.trim().split("\n");
      if (lineas.every((l) => /^\s*[-*] /.test(l))) {
        return '<ul class="faq__lista">' + lineas.map((l) => "<li>" + inline(l.replace(/^\s*[-*] /, "")) + "</li>").join("") + "</ul>";
      }
      return "<p>" + inline(lineas.join(" ")) + "</p>";
    }).join("");
  }

  const ICONO = (n) => '<svg class="icono-linea" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><use href="#i-' + esc(n) + '"></use></svg>';

  const bloques = {
    "hero-titulo": (d, ctx) => {
      const s = ctx.sitio || {};
      return esc(s.hero_titulo_inicio) + ' <span class="palabra-subrayada">' + esc(s.hero_titulo_resaltado) + "</span>";
    },
    "hero-lista": (d, ctx) => ((ctx.sitio && ctx.sitio.hero_lista) || []).map((l) => "<li>" + esc(l) + "</li>").join("\n"),
    "cta-titulo": (d, ctx) => esc(ctx.sitio && ctx.sitio.cta_titulo),
    "cta-texto": (d, ctx) => esc(ctx.sitio && ctx.sitio.cta_texto),

    problemas: (d, ctx) => (d.problemas || []).map((p) =>
      '<div class="problema" tabindex="0" role="button" aria-expanded="false">' +
        '<div class="problema__foto"><img src="' + esc(foto(ctx, p.imagen)) + '" alt="' + esc(p.alt || p.titulo) + '" loading="lazy"></div>' +
        '<p class="problema__texto">' + esc(p.titulo) + "</p>" +
        '<div class="problema__detalle"><p>' + esc(p.descripcion) + '</p><a class="problema__enlace" href="#contacto">Quiero ayuda con esto →</a></div>' +
      "</div>").join("\n"),

    servicios: (d, ctx) => (d.servicios || []).map((s) =>
      '<article class="servicio servicio--' + esc(s.color) + '" id="' + esc(s.id) + '">' +
        '<div class="servicio__foto"><img src="' + esc(foto(ctx, s.imagen)) + '" alt="' + esc(s.alt || s.titulo) + '" loading="lazy">' +
        '<span class="servicio__icono">' + ICONO(s.icono) + "</span></div>" +
        '<div class="servicio__cuerpo"><h3>' + esc(s.titulo) + "</h3><p>" + esc(s.texto) + "</p>" +
        '<a class="btn btn--' + esc(s.color) + ' btn--chico" href="' + esc(waLink(ctx, s.mensaje_whatsapp)) + '" target="_blank" rel="noopener">' + esc(s.boton) + "</a></div>" +
      "</article>").join("\n"),

    resenas: (d) => (d.resenas || []).map((r) => {
      const n = Math.max(1, Math.min(5, Number(r.estrellas) || 5));
      return '<article class="resena"><div class="resena__estrellas" role="img" aria-label="' + n + ' estrellas">' + "★".repeat(n) + "</div>" +
        '<p class="resena__texto" data-resena>' + esc(r.texto) + '</p><p class="resena__autor">— ' + esc(r.nombre) + "</p></article>";
    }).join("\n"),

    galeria: (d, ctx) => (d.galeria || []).map((g) =>
      "<div" + (g.grande ? ' class="grande"' : "") + '><img src="' + esc(foto(ctx, g.imagen)) + '" alt="' + esc(g.alt) + '" loading="lazy"></div>').join("\n"),

    faq: (d) => (d.faq || []).map((f) =>
      "<details><summary>" + esc(f.pregunta) + "</summary>" + md(f.respuesta) + "</details>").join("\n"),

    sedes: (d) => (d.sedes || []).map((s) =>
      '<article class="sede"><div class="mapa-embed"><iframe src="' + esc(s.mapa_embed) + '" title="Mapa: ' + esc(s.nombre) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
        '<a class="mapa-abrir" href="' + esc(s.boton_maps) + '" target="_blank" rel="noopener">Abrir en Maps</a></div>' +
        "<h3>" + esc(s.nombre) + '</h3><p class="sede__serv">' + esc(s.servicios) + "</p><p>" + esc(s.direccion) + "</p>" +
        '<a class="sede__enlace" href="' + esc(s.enlace_perfil) + '" target="_blank" rel="noopener">Ver en Google Maps →</a></article>').join("\n"),
  };

  /** Archivo de datos que alimenta cada bloque. */
  const ARCHIVO = {
    "hero-titulo": "sitio", "hero-lista": "sitio", "cta-titulo": "sitio", "cta-texto": "sitio",
    problemas: "problemas", servicios: "servicios", resenas: "resenas", galeria: "galeria", faq: "faq", sedes: "sedes",
  };

  return { bloques, ARCHIVO, esc, waLink };
});
