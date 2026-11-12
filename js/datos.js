/**
 * Actualizacion de contenido sin tocar el servidor.
 * El HTML ya trae el contenido de la ultima publicacion (build.js). Al cargar,
 * esta pagina consulta los archivos de datos del repositorio (los que edita el
 * panel /admin) y, si cambiaron, vuelve a pintar los bloques [data-bloque].
 * Si la consulta falla no pasa nada: queda el contenido ya escrito.
 */
(function () {
  "use strict";
  const raiz = document.documentElement;
  const BASE = raiz.getAttribute("data-datos");
  const MEDIOS = raiz.getAttribute("data-medios") || "";
  if (!BASE || !window.BHRender) return;
  const R = window.BHRender;
  const ARCHIVOS = ["sitio", "problemas", "servicios", "resenas", "galeria", "faq", "sedes"];

  Promise.all(ARCHIVOS.map((n) =>
    fetch(BASE + "datos/" + n + ".json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
  )).then((res) => {
    const datos = {};
    ARCHIVOS.forEach((n, i) => { datos[n] = res[i]; });
    // Espera a que layout.js haya inyectado el encabezado y el pie.
    const correr = () => { try { aplicar(datos); } catch (e) { /* nunca romper la pagina ya renderizada */ } };
    if (document.readyState === "complete") correr(); else window.addEventListener("load", correr);
  });

  function aplicar(d) {
    const sitio = d.sitio || {};
    const ctx = { medios: MEDIOS, sitio };

    Object.keys(R.bloques).forEach((nombre) => {
      const datos = d[R.ARCHIVO[nombre]];
      if (!datos) return; // sin datos nuevos: se deja lo ya escrito
      document.querySelectorAll('[data-bloque="' + nombre + '"]').forEach((el) => {
        el.innerHTML = R.bloques[nombre](datos, ctx);
      });
    });

    const rs = d.resenas;
    if (rs) {
      const grid = document.querySelector(".resenas-grid");
      if (grid && rs.limite_palabras) grid.dataset.limite = rs.limite_palabras;
      const mas = document.querySelector("[data-enlace-resenas]");
      if (mas && rs.enlace_mas) mas.href = rs.enlace_mas;
    }

    if (sitio.whatsapp) {
      document.querySelectorAll("a[data-wa]").forEach((a) => {
        a.href = R.waLink(ctx, sitio.whatsapp_mensaje);
      });
    }
    if (sitio.telefono_visible) {
      document.querySelectorAll('[data-sitio="telefono"]').forEach((el) => {
        const t = Array.from(el.childNodes).reverse().find((n) => n.nodeType === 3 && n.textContent.trim());
        if (t) t.textContent = " " + sitio.telefono_visible; else el.textContent = sitio.telefono_visible;
      });
    }
    ["instagram", "facebook", "tiktok"].forEach((r) => {
      if (sitio[r]) document.querySelectorAll('a[data-red="' + r + '"]').forEach((a) => { a.href = sitio[r]; });
    });

    const I = window.BHInit || {};
    ["problemas", "galeria", "resenas"].forEach((k) => { if (I[k]) I[k](); });
  }
})();
