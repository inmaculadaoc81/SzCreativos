const nodemailer = require("nodemailer");

const clean = (value, max = 2500) =>
  String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);

let cachedTransporter = null;
function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  const port = Number(process.env.SMTP_PORT || 465);
  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: String(process.env.SMTP_SECURE ?? (port === 465 ? "true" : "false")) === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000
  });
  return cachedTransporter;
}

module.exports = async function handler(req, res) {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      service: "SZ Creativos contacto API",
      node: process.version,
      environment: Object.fromEntries(required.map((key) => [key, Boolean(process.env[key])]))
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      code: "METHOD_NOT_ALLOWED"
    });
  }

  try {
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length) {
      return res.status(500).json({
        ok: false,
        code: "MISSING_SMTP_ENV",
        missing
      });
    }

    const data = req.body || {};

    const company = clean(data.company, 120);
    const contactName = clean(data.contact_name, 120);
    const phone = clean(data.phone, 40);
    const email = clean(data.email, 140);
    const service = clean(data.service, 150);
    const message = clean(data.message, 2500);

    if (!company || !contactName || !phone || !email || !service || !message) {
      return res.status(400).json({
        ok: false,
        code: "INVALID_FORM_DATA"
      });
    }

    const subject = "Nueva consulta SZ Creativos";

    const html = `
      <h2>Nueva consulta SZ Creativos</h2>
      <p><b>Clínica:</b> ${company}</p>
      <p><b>Persona de contacto:</b> ${contactName}</p>
      <p><b>Teléfono:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Servicio de interés:</b> ${service}</p>
      <p><b>Objetivo / necesidad:</b><br>${message.replace(/\n/g, "<br>")}</p>
    `;

    const transporter = getTransporter();
    await transporter.verify();
    await transporter.sendMail({
      from: `"SZ Creativos" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject,
      text: `Nueva consulta SZ Creativos\n\nClínica: ${company}\nPersona de contacto: ${contactName}\nTeléfono: ${phone}\nEmail: ${email}\nServicio de interés: ${service}\n\nObjetivo / necesidad:\n${message}`,
      html
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("SZ Creativos SMTP error:", error);

    return res.status(500).json({
      ok: false,
      code: "SMTP_SEND_FAILED"
    });
  }
};
