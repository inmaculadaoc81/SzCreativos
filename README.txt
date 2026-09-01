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

REVISIÓN ADICIONAL (pasada posterior):
- Google Analytics: no existía. Añadido G-50LR4SDRYZ en las 9 páginas
  del sitio (home + 8 páginas de servicio).
- H1 acortado a formato afirmativo corto (≤10 palabras, sin
  interrogación ni condicionales) siguiendo la norma actualizada de la
  familia — el anterior tenía 12 palabras: "Tu clínica es excelente.
  Nadie lo ve en Google." No se ha tocado el tamaño del H1: ya estaba
  en clamp(43-70px), en línea con el estándar del resto de la familia.
- No aplica middleware.mjs: las 8 páginas de /servicios/ son contenido
  original activo, no hay eliminaciones en el historial (sitio
  legítimamente multipágina).

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

REVISIÓN ADICIONAL (checklist unificado de la familia, a petición del cliente):
- Verificado primero, a petición del cliente: no aparece el correo
  soporte@kelatos.com visible en ninguna de las 9 páginas del sitio
  (ni siquiera en el schema.org, que aquí no incluye email). No hacía
  falta ningún cambio en este punto.
- BUG REAL — no existía ninguna sección de Cal.com en todo el sitio.
  Añadida en index.html, entre la sección de mapa/Google Business y el
  formulario: "Reserva una cita de 30 minutos" con el iframe
  compartido de la familia
  (https://cal.com/kelatos/30min?embed=true&theme=light), 720px de
  alto en escritorio y 760px en móvil. Añadido enlace "Pedir cita" al
  menú (desktop y móvil) en las 9 páginas del sitio.
- BUG REAL — la casilla de política de privacidad existía pero el
  texto no enlazaba a ningún sitio. Añadido el enlace estándar de la
  familia a https://kelatos.com/privacy-policy/, resaltado en azul.
- No aplica el aviso de horario/festivos: esta web no muestra
  dirección física ni horario de atención (confirmado en el README
  original, "no hay dirección visible en la web"); solo hay un
  formulario y WhatsApp como canales de contacto.
- No se ha añadido franja de aviso de servicio técnico independiente:
  no aplica a este negocio (agencia de marketing digital para
  veterinarios, sin el enfoque de reparación de equipos del resto de
  la familia).
- Verificado sin bugs: no hay ningún botón de teléfono que necesite
  icono a juego con WhatsApp (solo existe un canal de CTA, WhatsApp);
  no hay ninguna etiqueta rotada tipo hero-chip (.paw-ring es un
  círculo decorativo con un símbolo "✦", no una píldora con texto de
  marca); formulario correctamente conectado a /api/contact
  (form.js coincide con api/contact.js).

REVISIÓN ADICIONAL (a petición del cliente, "colócale la caja de
información como las otras"):
- No existía la tarjeta de información de contacto (aside.info) que sí
  tiene el resto de la familia en el hero. En su lugar había un bloque
  puramente decorativo (.hero-art: paw-ring, logo flotante y bocadillo
  de texto). Sustituido por la caja estándar de la familia, con el
  mismo diseño visual de esta web (blobs redondeados, navy/cian):
  - Dirección: C. Joaquín María López, 26 · 28015 Madrid (la misma
    dirección compartida por el resto de negocios de la familia en
    este mismo local; el README original decía que no había dirección
    visible porque no se había añadido, no porque fuera una decisión
    de negocio distinta).
  - Horario, con festivos: Lunes a viernes 09:30–18:00 / Sábados,
    domingos y días festivos estamos cerrados.
  - Contacto: WhatsApp y formulario de la web (no se ha inventado un
    teléfono; esta web solo usa esos dos canales, según su propia
    topbar).
  - Servicio: Marketing digital para clínicas veterinarias.
  - Enlace "Ver ubicación y reseñas →" al mismo Google Business ya
    usado en la sección de mapa.
  - Actualizado también el schema.org: añadido streetAddress y
    postalCode (antes solo tenía addressLocality "Madrid"), coherente
    con la dirección ahora visible en la página.
  - Las reglas CSS de los elementos decorativos anteriores
    (.hero-art, .hero-logo, .paw-ring, .bubble) se han dejado
    intactas, sin uso, según práctica habitual de la familia.

REVISIÓN ADICIONAL (checklist unificado de la familia, a petición del cliente — repo 48/48, ÚLTIMO REPOSITORIO):
- Verificado: enlace de Cal.com ya actualizado con attendeePhoneNumber
  y overlayCalendar.
- Verificado: el correo soporte@kelatos.com no aparece visible.
- Verificado: el mensaje prellenado de WhatsApp ya usa "¡Hola SZ
  Creativos!" en las tres ubicaciones (hero, contacto y flotante).
- Verificado: el menú móvil (#mobileMenu) ya tenía el script de
  cierre al pulsar un enlace.
- Verificado: sin iconos ni imágenes con proporciones fijas
  incorrectas.
- Verificado: el H1 en móvil ya está en 48px.
- Verificado: el único CTA del hero (.wa-btn) ya tenía
  border-radius:999px y estado hover que oscurece el fondo. No
  requería cambios.
- Verificado: sin patrón de franja de insignias bajo el H1 (familia
  Dyson); no aplica la reubicación.
- No aplica la franja de aviso de servicio técnico independiente:
  agencia de marketing digital para veterinarios, no reparación.
- Sin cambios de código en este repo: todos los puntos del checklist
  unificado ya estaban aplicados.

--- Con este repo se completa el checklist unificado de la familia
    (48/48 repositorios revisados). ---
