/**
 * Envio del formulario de contacto (seccion CTA / WhatsApp).
 * Los datos van al backend de freak-design.com (URL en data-api del <form>),
 * que los reenvia por correo a Buenos Habitos via Brevo. Funciona igual sin
 * importar en que hosting este la pagina. No se guarda nada aqui.
 * Si falla, se sugiere escribir por WhatsApp.
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
      _honey: form._honey.value, // trampa anti-spam: si trae algo, el backend lo descarta
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
      const respuesta = await fetch(form.dataset.api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json().catch(() => ({}));
      if (respuesta.status === 429) throw new Error(resultado.error || "Demasiados intentos.");
      if (!respuesta.ok || !resultado.ok) throw new Error("envio no aceptado");

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
