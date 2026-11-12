/** Tarjetas "¿En qué podemos ayudarte?": clic / Enter despliega la descripcion (hover tambien en escritorio). */
window.BHInit = window.BHInit || {};
window.BHInit.problemas = function () {
  document.querySelectorAll(".problema").forEach((tarjeta) => {
    const alternar = () => {
      const abierta = tarjeta.classList.toggle("abierta");
      tarjeta.setAttribute("aria-expanded", String(abierta));
    };
    tarjeta.addEventListener("click", (e) => {
      if (e.target.closest(".problema__enlace")) return;
      alternar();
    });
    tarjeta.addEventListener("keydown", (e) => {
      if (e.target !== tarjeta) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); alternar(); }
    });
  });
};
document.addEventListener("DOMContentLoaded", window.BHInit.problemas);
