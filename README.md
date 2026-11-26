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
