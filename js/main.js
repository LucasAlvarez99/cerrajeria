(function () {
  "use strict";
  var C = window.CERRAJERIA || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var tel = "+" + C.telefono;
  var waBase = "https://wa.me/" + C.telefono;

  /* Medición simple: manda eventos a dataLayer/gtag si existen */
  function track(nombre) {
    try {
      if (window.dataLayer) window.dataLayer.push({ event: nombre });
      if (typeof window.gtag === "function") window.gtag("event", nombre);
    } catch (e) {}
  }

  /* Textos desde config */
  $$("[data-bind]").forEach(function (el) {
    var v = C[el.getAttribute("data-bind")];
    if (v) el.textContent = v;
  });
  $$("[data-tel]").forEach(function (a) { a.setAttribute("href", "tel:" + tel); });
  $$("a[data-wa]").forEach(function (a) {
    a.setAttribute("href", waBase + "?text=" + encodeURIComponent("Hola, necesito un cerrajero. Vi su página."));
  });
  $$("[data-evento]").forEach(function (el) {
    el.addEventListener("click", function () { track(el.getAttribute("data-evento")); });
  });

  /* Título de página según zona */
  if (C.zona && C.nombre) document.title = "Cerrajero a domicilio en " + C.zona + " | " + C.nombre;

  /* Estado (también se puede probar con ?estado=en-trabajo) */
  var textos = {
    "disponible": "Disponible ahora: llamame o escribime.",
    "en-trabajo": "Estoy en un trabajo. Escribime por WhatsApp y te respondo apenas salga.",
    "fuera": "Ahora no atiendo. Dejame tu mensaje por WhatsApp y te respondo apenas pueda."
  };
  var qs = new URLSearchParams(location.search).get("estado");
  var est = textos[qs] ? qs : (textos[C.estado] ? C.estado : "disponible");
  var box = $("#estado");
  box.setAttribute("data-estado", est);
  $("#estadoTexto").textContent = textos[est];

  /* Barrios */
  var chips = $("#chips");
  (C.barrios || []).forEach(function (b) {
    var li = document.createElement("li");
    li.textContent = b;
    chips.appendChild(li);
  });

  /* Pagos y datos legales (solo si hay datos) */
  if (!C.pagos) { var fp = $("#faq-pagos"); if (fp) fp.remove(); }
  var legal = [];
  if (C.titular) legal.push("Titular: " + C.titular);
  if (C.cuit) legal.push("CUIT: " + C.cuit);
  if (legal.length) { var l = $("#legal"); l.textContent = legal.join(" · "); l.hidden = false; }

  /* Datos estructurados para Google (se arman con la config) */
  var ld = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "name": C.nombre,
    "telephone": "+" + C.telefono,
    "description": "Cerrajero a domicilio en " + C.zona + ": aperturas, cambio de cerraduras, llaves rotas y autos.",
    "areaServed": (C.barrios || []).map(function (b) { return { "@type": "Place", "name": b }; })
  };
  var s = document.createElement("script");
  s.type = "application/ld+json";
  s.text = JSON.stringify(ld);
  document.head.appendChild(s);

  /* Accesos que preseleccionan el problema y llevan al formulario */
  var porClave = {
    afuera: "Me quedé afuera de mi casa o local",
    cambio: "Quiero cambiar la cerradura o el bombín",
    llave: "Se me rompió o se trabó la llave",
    instalar: "Quiero instalar una cerradura nueva",
    auto: "Me quedé afuera del auto",
    otro: "Tengo otra consulta"
  };
  var form = $("#form");
  var barrio = $("#barrio");
  var error = $("#error");

  $$("[data-problema]").forEach(function (a) {
    a.addEventListener("click", function () {
      var val = porClave[a.getAttribute("data-problema")];
      var r = $$('input[name="problema"]', form).filter(function (i) { return i.value === val; })[0];
      if (r) r.checked = true;
      error.hidden = true;
      setTimeout(function () { barrio.focus({ preventScroll: true }); }, 450);
    });
  });

  /* Armado del mensaje de WhatsApp */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var problema = ($('input[name="problema"]:checked', form) || {}).value;
    var donde = barrio.value.trim();
    var calle = $("#calle").value.trim();
    var urgente = $('input[name="urgente"]', form).checked;

    if (!problema) {
      return fallo("Elegí primero qué te pasó (paso 1).", $('input[name="problema"]', form));
    }
    if (!donde) {
      return fallo("Escribí en qué barrio o localidad estás (paso 2), así sé si llego.", barrio);
    }
    error.hidden = true;

    var msg = (urgente ? "URGENTE. " : "") + "Hola, necesito un cerrajero.\n" +
      "Qué pasó: " + problema + ".\n" +
      "Estoy en: " + donde + (calle ? ", " + calle : "") + ".";
    track("whatsapp_form_enviado");
    window.open(waBase + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });

  /* La barra fija se esconde mientras los botones grandes del inicio están a la vista */
  var barra = $(".barra"), hb = $(".hero__botones");
  if (barra && hb && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      barra.classList.toggle("oculta", en[0].isIntersecting);
    }, { threshold: 0.6 }).observe(hb);
  }

  function fallo(texto, campo) {
    error.textContent = texto;
    error.hidden = false;
    if (campo) campo.focus();
  }
})();
