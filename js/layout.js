/**
 * Genera el header y el footer del sitio, inyecta el sprite de iconos de
 * linea y los helpers de "onda" decorativa, e inserta todo en
 * <div id="site-header"></div> y <div id="site-footer"></div>.
 * Como esta es una landing de una sola pagina, MENU_ITEMS apunta a anclas
 * (#seccion) dentro del mismo documento, no a otros archivos.
 */

const ICONO_WHATSAPP_SVG = `
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>`;

const ICONO_INSTAGRAM_SVG = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>
  </svg>`;

const ICONO_FACEBOOK_SVG = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.35c-.28-.04-1.23-.12-2.34-.12-2.31 0-3.9 1.41-3.9 4V10.4H8.4v3h2.98V21h3.12Z" fill="currentColor"/>
  </svg>`;

const ICONO_TIKTOK_SVG = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14 3v11.2a3.4 3.4 0 1 1-3.4-3.4M14 3c.3 2.4 1.9 4 4.4 4.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const ICONO_YOUTUBE_SVG = `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" stroke-width="1.6"/>
    <path d="M10.5 9.5l5 2.5-5 2.5Z" fill="currentColor"/>
  </svg>`;

/** Path "d" de cada icono de linea del sprite (viewBox 0 0 24 24). */
const ICONOS_LINEA = {
  house: '<path d="M4 11 12 4l8 7"/><path d="M6 10.2V19a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-8.8"/>',
  heart: '<path d="M12 20.2S4.8 15.7 4.8 10.4A4.4 4.4 0 0 1 12 7.1a4.4 4.4 0 0 1 7.2 3.3c0 5.3-7.2 9.8-7.2 9.8Z"/>',
  people: '<circle cx="9" cy="8.2" r="3"/><path d="M3.3 20c0-3.3 2.6-6 5.7-6s5.7 2.7 5.7 6"/><circle cx="17.3" cy="9.2" r="2.3"/><path d="M15.6 20c.2-2.4 1.9-4.4 3.9-4.9"/>',
  paw: '<circle cx="12" cy="15.4" r="4"/><circle cx="6" cy="9.6" r="1.8"/><circle cx="10.1" cy="6.2" r="1.8"/><circle cx="13.9" cy="6.2" r="1.8"/><circle cx="18" cy="9.6" r="1.8"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 3v2.2M12 18.8V21M4.2 12H2M22 12h-2.2M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5"/>',
  mapPin: '<path d="M12 21s7-6.1 7-11.4A7 7 0 0 0 5 9.6C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.6" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="8.3"/><path d="M12 7.6V12l2.9 2"/>',
  phone: '<path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.25-.25.6-.33.92-.2 1 .34 2.1.52 3.18.52.5 0 .9.4.9.9V19c0 .5-.4.9-.9.9C10.6 19.9 4.1 13.4 4.1 5.3c0-.5.4-.9.9-.9h3c.5 0 .9.4.9.9 0 1.1.18 2.18.52 3.18.11.3.04.66-.2.9l-2.6 1.42Z"/>',
  chat: '<path d="M4 5.2h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9.2L5 21v-3.8H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"/>',
  checkCircle: '<circle cx="12" cy="12" r="8.3"/><path d="M8.2 12.2 10.6 14.6 15.6 9.4"/>',
  star: '<path d="M12 3.6 14.4 8.7l5.6.7-4.1 4 1 5.6-4.9-2.6-4.9 2.6 1-5.6-4.1-4 5.6-.7Z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};

function iconoLinea(nombre, clase) {
  return `<svg class="icono-linea${clase ? " " + clase : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS_LINEA[nombre] || ""}</svg>`;
}

/** SVG de una onda suave, lista para usarse como divisor entre secciones. */
function ondaSvg(fillVar) {
  return `<svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0,40 C240,85 480,0 720,28 C960,56 1200,12 1440,40 L1440,80 L0,80 Z" fill="${fillVar}"/></svg>`;
}

/** Inserta (una sola vez) el sprite oculto con todos los simbolos de icono. */
function inyectarSpriteIconos() {
  if (document.getElementById("sprite-iconos")) return;
  const div = document.createElement("div");
  div.id = "sprite-iconos";
  div.style.display = "none";
  div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><defs>${Object.entries(ICONOS_LINEA)
    .map(([nombre, d]) => `<symbol id="i-${nombre}" viewBox="0 0 24 24">${d}</symbol>`)
    .join("")}</defs></svg>`;
  document.body.prepend(div);
}

/** Reemplaza `origen` (un <div>) por un nuevo elemento semantico `tag`, conservando su id. */
function convertirAElementoSemantico(origen, tag) {
  const nuevo = document.createElement(tag);
  nuevo.id = origen.id;
  origen.replaceWith(nuevo);
  return nuevo;
}

function renderHeader() {
  const contenedor = document.getElementById("site-header");
  if (!contenedor) return;
  const el = convertirAElementoSemantico(contenedor, "header");
  el.classList.add("site-header");

  const base = document.body.getAttribute("data-page") === "index.html" ? "" : "index.html";
  const items = MENU_ITEMS.map((item) => `<li><a class="nav__link" href="${base}${item.href}">${item.label}</a></li>`).join("");

  el.innerHTML = `
    <div class="nav">
      <a href="${base}#inicio" class="nav__marca">
        <img class="nav__logo-img" src="img/logo-horizontal.png" alt="Buenos Hábitos Caninos">
      </a>

      <button class="nav__toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-cuerpo">
        <span></span><span></span><span></span>
      </button>

      <nav class="nav__cuerpo" id="nav-cuerpo" aria-label="Principal">
        <ul class="nav__lista">${items}</ul>
        <div class="nav__cta">
          <a href="https://wa.me/593987444999?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios" target="_blank" rel="noopener" class="btn btn--morado btn--chico nav__wa" data-wa data-sitio="telefono">${ICONO_WHATSAPP_SVG} 0987 444 999</a>
        </div>
      </nav>
      <div class="nav__fondo" data-nav-fondo></div>
    </div>
  `;
}

function renderFooter() {
  // El pie se arma siempre desde este archivo: si en el HTML falta el contenedor
  // (o alguien lo quito), se crea al final del <body>.
  let contenedor = document.getElementById("site-footer");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "site-footer";
    document.body.appendChild(contenedor);
  }
  const el = convertirAElementoSemantico(contenedor, "footer");
  el.classList.add("site-footer");

  const base = document.body.getAttribute("data-page") === "index.html" ? "" : "index.html";
  const items = MENU_ITEMS.map((item) => `<a href="${base}${item.href}">${item.label}</a>`).join("");

  el.innerHTML = `
    <div class="footer__onda">${ondaSvg("var(--crema)")}</div>
    <div class="contenedor footer__fila">
      <div class="footer__marca">
        <a class="footer__logo-pastilla" href="${base}#inicio"><img src="img/logo-horizontal.png" alt="Buenos Hábitos Caninos"></a>
      </div>
      <nav class="footer__lista" aria-label="Enlaces del pie de página">${items}</nav>
      <div class="footer__redes">
        <a class="footer__red" data-red="instagram" href="https://www.instagram.com/buenoshabitoscaninos.ec" aria-label="Instagram de Buenos Hábitos" target="_blank" rel="noopener">${ICONO_INSTAGRAM_SVG}</a>
        <a class="footer__red" data-red="facebook" href="https://www.facebook.com/buenoshabitoscaninos.ec/" aria-label="Facebook de Buenos Hábitos" target="_blank" rel="noopener">${ICONO_FACEBOOK_SVG}</a>
        <a class="footer__red" data-red="tiktok" href="https://www.tiktok.com/@buenoshabitoscaninos" aria-label="TikTok de Buenos Hábitos" target="_blank" rel="noopener">${ICONO_TIKTOK_SVG}</a>
        <a class="footer__red" data-wa href="https://wa.me/593987444999" aria-label="WhatsApp de Buenos Hábitos" target="_blank" rel="noopener">${ICONO_WHATSAPP_SVG}</a>
      </div>
    </div>
    <p class="footer__base">Hábitos diarios, perros extraordinarios.</p>
    <p class="footer__copy">© ${new Date().getFullYear()} Buenos Hábitos Caninos. Todos los derechos reservados. - <a class="footer__legal" href="${base}privacidad.html">Política de Privacidad</a> - <a class="footer__credito" href="https://freak-design.com" target="_blank" rel="noopener">freak-design.com</a></p>
  `;
}

/**
 * El pie de pagina se regenera en cada carga y se vigila: si alguien lo borra
 * o altera desde el codigo o las herramientas del navegador (por ejemplo quitar
 * el credito), se vuelve a generar tal como esta definido en renderFooter().
 */
function vigilarFooter() {
  let reparando = false;
  const integro = () => {
    const f = document.querySelector("footer.site-footer");
    return f && f.querySelector(".footer__credito") && f.querySelector(".footer__copy");
  };
  const reparar = () => {
    if (reparando || integro()) return;
    reparando = true;
    document.querySelectorAll("footer.site-footer").forEach((f) => f.remove());
    renderFooter();
    reparando = false;
  };
  new MutationObserver(reparar).observe(document.body, { childList: true, subtree: true });
}

document.addEventListener("DOMContentLoaded", () => {
  inyectarSpriteIconos();
  renderHeader();
  renderFooter();
  vigilarFooter();
});
