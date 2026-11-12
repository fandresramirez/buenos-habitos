/**
 * Toggle del menu hamburguesa en movil + resaltado del enlace activo
 * segun la seccion visible (landing de una sola pagina).
 * Se ejecuta despues de layout.js (mismo evento DOMContentLoaded,
 * registrado despues), por lo que el header ya esta insertado en el DOM.
 */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle");
  const cuerpo = document.getElementById("nav-cuerpo");
  const fondo = document.querySelector("[data-nav-fondo]");
  if (!toggle || !cuerpo || !fondo) return;

  const cerrar = () => {
    toggle.setAttribute("aria-expanded", "false");
    cuerpo.classList.remove("esta-abierto");
    fondo.classList.remove("esta-abierto");
    document.body.style.overflow = "";
  };

  const abrir = () => {
    toggle.setAttribute("aria-expanded", "true");
    cuerpo.classList.add("esta-abierto");
    fondo.classList.add("esta-abierto");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const abierto = toggle.getAttribute("aria-expanded") === "true";
    abierto ? cerrar() : abrir();
  });

  fondo.addEventListener("click", cerrar);
  cuerpo.querySelectorAll(".nav__link").forEach((link) => link.addEventListener("click", cerrar));

  // Resalta en el menu la seccion visible mientras se hace scroll.
  const enlaces = [...document.querySelectorAll(".nav__link")];
  const secciones = enlaces
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (secciones.length) {
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          const id = "#" + entrada.target.id;
          const enlace = enlaces.find((a) => a.getAttribute("href") === id);
          if (!enlace) return;
          if (entrada.isIntersecting) {
            enlaces.forEach((a) => a.classList.remove("activo"));
            enlace.classList.add("activo");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secciones.forEach((s) => observer.observe(s));
  }
});
