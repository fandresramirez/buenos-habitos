/**
 * Envio del formulario de contacto (seccion CTA / WhatsApp).
 * Hace POST a /api/contacto, servido por un pequeno backend Node propio
 * (Express + Nodemailer) que reenvia el mensaje por correo. No hay
 * almacenamiento ni envio en el propio navegador: si el backend no
 * responde, se le sugiere al visitante escribir por WhatsApp en su lugar.
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
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) throw new Error("respuesta no ok");

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
