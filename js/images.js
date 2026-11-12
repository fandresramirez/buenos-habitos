/**
 * Mapa central de fotografias del sitio.
 *
 * Hoy todas las claves apuntan a archivos locales en /img (placeholders
 * reales de referencia, tomados del material ya generado para el proyecto).
 * Varias de estas fotos deben reemplazarse por material real del negocio
 * (Marco trabajando, clases, instalaciones, hospedaje) apenas este
 * disponible: el cambio es editar SOLO el valor de la clave aqui, sin
 * tocar index.html.
 */
const IMAGE_SOURCES = {
  // Hero
  "hero-foto": "img/hero-foto.webp",

  // "En que podemos ayudarte" — retratos de perro por situacion.
  "problema-no-hace-caso": "img/problema-no-hace-caso.webp",
  "problema-tira-correa": "img/problema-tira-correa.webp",
  "problema-salta-personas": "img/problema-salta-personas.webp",
  "problema-destruye-cosas": "img/problema-destruye-cosas.webp",
  "problema-ladra": "img/problema-ladra.webp",
  "problema-ansiedad": "img/problema-ansiedad.webp",
  "problema-crianza": "img/problema-crianza.webp",

  // Servicios
  "servicio-clases": "img/servicio-clases.webp",
  "servicio-manada": "img/servicio-manada.webp",
  "servicio-estadia": "img/servicio-estadia.webp",
  "servicio-hospedaje": "img/servicio-hospedaje.webp",

  // Por que Buenos Habitos
  "porque-foto": "img/porque-foto.webp?v=2",

  // Conoce a Marco — PENDIENTE: foto real de Marco.
  "marco-foto": "img/marco-foto.webp",

  // Galeria (8-12 fotos) — PENDIENTE: reemplazar por fotos reales del negocio.
  "galeria-1": "img/galeria-1.webp",
  "galeria-2": "img/galeria-2.webp",
  "galeria-3": "img/galeria-3.webp",
  "galeria-4": "img/galeria-4.webp",
  "galeria-5": "img/galeria-5.webp",
  "galeria-6": "img/galeria-6.webp",
  "galeria-7": "img/galeria-7.webp",
  "galeria-8": "img/galeria-8.webp",
  "galeria-9": "img/galeria-9.webp",
  "galeria-10": "img/galeria-10.webp",
  "galeria-11": "img/galeria-11.webp",
  "galeria-12": "img/galeria-12.webp",

};

/**
 * Aplica IMAGE_SOURCES a todo <img class="js-img" data-img-key="..."> del
 * documento. Si una clave no existe en el mapa, se deja el src local del
 * HTML (fallback) sin tocar.
 */
function aplicarImagenes() {
  document.querySelectorAll("img.js-img[data-img-key]").forEach((img) => {
    const key = img.getAttribute("data-img-key");
    if (Object.prototype.hasOwnProperty.call(IMAGE_SOURCES, key)) {
      img.src = IMAGE_SOURCES[key];
    }
  });
}

document.addEventListener("DOMContentLoaded", aplicarImagenes);
