/**
 * Envio del formulario de contacto (seccion CTA / WhatsApp) via Web3Forms.
 * Web3Forms reenvia cada mensaje al correo con el que se creo la clave de
 * acceso (data-web3forms en el <form>). Esa clave es publica por diseno: solo
 * permite enviar a ese correo. No hay backend propio ni se guarda nada aqui.
 * Si el envio falla, se sugiere al visitante escribir por WhatsApp.
 */
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");
  if (!form) return;

  const estado = form.querySelector(".form-contacto__estado");
  const boton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const datos = {
      nombre: form.nombre.value.trim(),
      telefono: form.telefono.value.trim(),
      correo: form.correo.value.trim(),
      edad: form.edad.value.trim(),
      mensaje: form.mensaje.value.trim(),
    };

    if (!datos.nombre || !datos.telefono || !datos.correo || !datos.edad || !datos.mensaje) {
      estado.textContent = "Por favor completa todos los campos.";
      estado.dataset.estado = "error";
      return;
    }

    boton.disabled = true;
    estado.dataset.estado = "enviando";
    estado.textContent = "Enviando...";

    try {
      const respuesta = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: form.dataset.web3forms,
          subject: `Buenos Hábitos — nuevo contacto de ${datos.nombre}`,
          from_name: "Sitio web Buenos Hábitos",
          botcheck: form.botcheck.checked,
          email: datos.correo, // Web3Forms lo usa como "responder a"
          "Nombre": datos.nombre,
          "Teléfono / WhatsApp": datos.telefono,
          "Edad del perro": datos.edad,
          "Mensaje": datos.mensaje,
        }),
      });

      const resultado = await respuesta.json().catch(() => ({}));
      if (!respuesta.ok || !resultado.success) throw new Error("envio no aceptado");

      estado.dataset.estado = "ok";
      estado.textContent = "¡Listo! Te contactaremos muy pronto.";
      form.reset();
    } catch (error) {
      estado.dataset.estado = "error";
      estado.textContent = "No pudimos enviar el formulario. Escríbenos directo por WhatsApp, por favor.";
    } finally {
      boton.disabled = false;
    }
  });
});
