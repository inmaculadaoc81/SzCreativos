
const form = document.querySelector('#contact-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const status = document.querySelector('#form-status');
    status.textContent = 'Enviando solicitud...';
    status.classList.remove('ok', 'error');

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.code || 'SEND_FAILED');
      }

      status.textContent = 'Solicitud enviada correctamente. Te contactaremos lo antes posible.';
      status.classList.add('ok');
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent = 'No se pudo enviar la solicitud. También puedes escribirnos por WhatsApp.';
      status.classList.add('error');
    }
  });
}
