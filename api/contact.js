const { google } = require("googleapis");

const clean = (value, max = 2500) =>
  String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);

module.exports = async function handler(req, res) {
  const required = [
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_REFRESH_TOKEN",
    "GOOGLE_EMAIL",
    "CONTACT_EMAIL"
  ];

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      service: "SZ Creativos contacto API",
      node: process.version,
      environment: Object.fromEntries(
        required.map((key) => [key, Boolean(process.env[key])])
      )
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
        code: "MISSING_ENVIRONMENT_VARIABLES",
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

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    auth.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    await auth.getAccessToken();

    const gmail = google.gmail({
      version: "v1",
      auth
    });

    const subject = "Nueva consulta SZ Creativos";

    const body = `
      <h2>Nueva consulta SZ Creativos</h2>
      <p><b>Clínica:</b> ${company}</p>
      <p><b>Persona de contacto:</b> ${contactName}</p>
      <p><b>Teléfono:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Servicio de interés:</b> ${service}</p>
      <p><b>Objetivo / necesidad:</b><br>${message.replace(/\n/g, "<br>")}</p>
    `;

    const raw = [
      `From: SZ Creativos <${process.env.GOOGLE_EMAIL}>`,
      `To: ${process.env.CONTACT_EMAIL}`,
      `Reply-To: ${email}`,
      `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "",
      body
    ].join("\r\n");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: Buffer.from(raw).toString("base64url")
      }
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("SZ Creativos Gmail API error:", error);

    return res.status(500).json({
      ok: false,
      code: "EMAIL_SEND_FAILED"
    });
  }
};