# Cerrajería · landing a domicilio

HTML, CSS y JS puros (sin build). Abrir `index.html` o subir la carpeta a cualquier hosting / GitHub Pages.

## Qué se edita
Solo `js/config.js`: nombre, teléfono/WhatsApp, zona, barrios, formas de pago, datos del titular y **estado**.

## Estado del cerrajero (reemplaza al horario)
En `config.js`, `estado` puede ser `"disponible"`, `"en-trabajo"` o `"fuera"`. Cambia el cartel de arriba.
Para probar sin editar: `index.html?estado=en-trabajo`.

## A validar con el cliente antes de publicar
Teléfono real, zona y barrios, formas de pago, que le sirva "precio antes de empezar" y "pido que acredite la propiedad", fotos reales (hoy el hero es una ilustración).

## Medición
Cada botón dispara un evento (`llamar_hero`, `whatsapp_form_enviado`, etc.) a `dataLayer`/`gtag` si están instalados.

## SEO
- Título, descripción, canonical, Open Graph/Twitter, datos estructurados (Locksmith, WebSite y FAQPage) y `sitemap.xml` están en `index.html` y la raíz.
- La URL actual es `https://lucasalvarez99.github.io/cerrajeria/`. **Si se compra un dominio propio**, cambiarla en `index.html` (canonical, og:url, og:image, JSON-LD), `robots.txt` y `sitemap.xml`, y mover `robots.txt` a la raíz del dominio.
- Si cambian el teléfono o los barrios, actualizar también el JSON-LD de `index.html` (el texto visible sale de `js/config.js`).
- Al editar CSS/JS, subir el número `?v=` en `index.html` para evitar caché.
- Pendiente fuera de la página: crear el Perfil de Empresa en Google con el mismo nombre y teléfono, y dar de alta el sitio en Search Console.
