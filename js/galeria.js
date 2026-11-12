/** Lightbox de la galeria: clic en una foto la agranda en un popup con navegacion. */
window.BHInit = window.BHInit || {};
window.BHInit.galeria = function () {
  const grid = document.querySelector(".galeria-grid");
  if (!grid) return;
  const fotos = () => Array.from(grid.querySelectorAll("img"));
  fotos().forEach((f) => { f.style.cursor = "zoom-in"; f.tabIndex = 0; f.setAttribute("role", "button"); });
  if (grid.dataset.lightbox) return; // los listeners van en el contenedor: una sola vez
  grid.dataset.lightbox = "1";

  const dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.setAttribute("aria-label", "Foto ampliada");
  dlg.innerHTML = `
    <button type="button" class="lightbox__cerrar" aria-label="Cerrar">&times;</button>
    <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Foto anterior">&#8249;</button>
    <img class="lightbox__img" alt="">
    <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Foto siguiente">&#8250;</button>`;
  document.body.appendChild(dlg);
  const img = dlg.querySelector(".lightbox__img");
  let actual = 0;

  function mostrar(i) {
    const lista = fotos();
    actual = (i + lista.length) % lista.length;
    img.src = lista[actual].currentSrc || lista[actual].src;
    img.alt = lista[actual].alt;
  }
  const abrir = (f) => { mostrar(fotos().indexOf(f)); dlg.showModal(); };

  grid.addEventListener("click", (e) => { if (e.target.tagName === "IMG") abrir(e.target); });
  grid.addEventListener("keydown", (e) => {
    if (e.target.tagName === "IMG" && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); abrir(e.target); }
  });
  dlg.querySelector(".lightbox__cerrar").addEventListener("click", () => dlg.close());
  dlg.querySelector(".lightbox__nav--prev").addEventListener("click", () => mostrar(actual - 1));
  dlg.querySelector(".lightbox__nav--next").addEventListener("click", () => mostrar(actual + 1));
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrar(actual - 1);
    if (e.key === "ArrowRight") mostrar(actual + 1);
  });
};
document.addEventListener("DOMContentLoaded", window.BHInit.galeria);
