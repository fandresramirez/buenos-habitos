/**
 * Resenas con "Ver mas": si el texto supera el limite de palabras se recorta y
 * se agrega un boton para mostrar el comentario completo. El limite sale de
 * data-limite en .resenas-grid (editable desde el panel de administracion).
 */
window.BHInit = window.BHInit || {};
window.BHInit.resenas = function () {
  const grid = document.querySelector(".resenas-grid");
  const max = Number(grid && grid.dataset.limite) || 35;
  document.querySelectorAll("[data-resena]").forEach((p) => {
    const completo = p.textContent.trim();
    const palabras = completo.split(/\s+/);
    if (palabras.length <= max) return;

    const corto = palabras.slice(0, max).join(" ") + "…";
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "resena__mas";
    boton.setAttribute("aria-expanded", "false");
    boton.textContent = "Ver más";
    p.textContent = corto;
    p.after(boton);

    boton.addEventListener("click", () => {
      const abierto = boton.getAttribute("aria-expanded") === "true";
      p.textContent = abierto ? corto : completo;
      boton.textContent = abierto ? "Ver más" : "Ver menos";
      boton.setAttribute("aria-expanded", String(!abierto));
    });
  });
};
document.addEventListener("DOMContentLoaded", window.BHInit.resenas);
