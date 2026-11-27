/**
 * Envio del formulario de contacto (seccion CTA / WhatsApp) via FormSubmit.
 * El destino va en data-formsubmit del <form>: el correo del cliente o, una vez
 * activado, el identificador aleatorio que entrega FormSubmit (para no dejar el
 * correo visible en el codigo). El primer envio a un correo nuevo no llega como
 * mensaje: FormSubmit manda un enlace de activacion a ese correo.
 * No hay backend propio ni se guarda nada aqui. Si falla, se sugiere WhatsApp.
 */
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
      const respuesta = await fetch("https://formsubmit.co/ajax/" + form.dataset.formsubmit, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Buenos Hábitos — nuevo contacto de ${datos.nombre}`,
          _template: "table",
          _honey: form._honey.value, // trampa anti-spam: si trae algo, FormSubmit lo descarta
          email: datos.correo, // FormSubmit lo usa como "responder a"
          "Nombre": datos.nombre,
          "Teléfono / WhatsApp": datos.telefono,
          "Edad del perro": datos.edad,
          "Mensaje": datos.mensaje,
        }),
      });

      const resultado = await respuesta.json().catch(() => ({}));
      if (!respuesta.ok || String(resultado.success) !== "true") throw new Error("envio no aceptado");

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
