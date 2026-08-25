SZ CREATIVOS — MARKETING DIGITAL PARA VETERINARIOS (MADRID)

Sitio multipágina (home + 8 páginas de servicio en /servicios/). Al
principio no incluía chatbot n8n (a diferencia de otras webs de la
familia); se ha añadido después, ver más abajo.

DOMINIO:
https://szcreativos.com/
El sitio no tenía dominio real configurado en ningún sitio (sitemap.xml
usaba el placeholder "szcreativos.example" y no había canonical ni
og:url en index.html). Confirmado por el cliente y aplicado en
canonical, og:url, robots.txt (Sitemap:), sitemap.xml y el "url" del
JSON-LD.

REVISIÓN DE CÓDIGO:
- Menú móvil: no existía botón de menú (.links se ocultaba a partir de
  950px sin alternativa). Añadido .menu-btn + desplegable #mobileMenu en
  las 9 páginas del sitio (home + 8 servicios).
- Chatbot n8n: no existía en ninguna página. Añadido en las 9 páginas del
  sitio (home + 8 servicios), con el mismo webhook compartido de la
  familia y textos en español. Posicionado por encima del botón de
  WhatsApp (bottom:96px vs bottom:24px del WhatsApp) para que no se
  superpongan, con borde blanco estándar y protección
  :not([class*="toggle"]) contra la colisión conocida del selector
  [class*="chat-window"].
- vercel.json: NO EXISTÍA. Añadido ({"cleanUrls":true,"trailingSlash":
  false}), necesario porque el sitemap ya usa URLs sin ".html"
  (/servicios/seo-veterinarias) — sin cleanUrls esas rutas no
  funcionarían correctamente en Vercel.
- Datos schema.org: no existían en ninguna página. Añadido
  AdvertisingAgency en index.html (nombre, descripción, área de servicio
  Madrid sin dirección inventada —no hay dirección visible en la web—, y
  enlace de Google Business). Pendiente: replicar en las páginas de
  servicio si se solicita.
- Contenido SEO: ya existía contenido propio suficiente (hero, método,
  8 tarjetas de servicio con enlace a su página dedicada); no se ha
  añadido una sección adicional.
- H1 de portada reescrito con enfoque "problema antes que servicio"
  (estilo directo, centrado en la preocupación real del dueño de clínica,
  sin copiar textos de terceros): "Tu clínica hace un trabajo excelente.
  En Google, casi nadie lo sabe." + lead ampliando preocupación,
  consecuencia y solución.

CAMBIO IMPORTANTE — formulario de contacto:
api/contact.js usaba la API de Gmail vía OAuth2 (paquete "googleapis"),
distinto al resto de la familia. Sustituido por el mismo patrón SMTP +
nodemailer que usan todas las demás webs, mismo endpoint /api/contact y
mismos campos (company, contact_name, phone, email, service, message).

Variables SMTP a configurar en Vercel (sustituyen a las de Google):
SMTP_HOST=cp7124.webempresa.eu
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=soporte@kelatos.com
SMTP_PASS=[configurada únicamente en Vercel]
CONTACT_EMAIL=soporte@kelatos.com

Las variables antiguas (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
GOOGLE_REFRESH_TOKEN, GOOGLE_EMAIL) ya no se usan y pueden eliminarse de
Vercel. package.json actualizado: quitada la dependencia "googleapis",
añadida "nodemailer"; node engine ajustado a 22.x para igualar al resto
de la familia.
