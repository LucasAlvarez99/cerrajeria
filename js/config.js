/* ============================================================
   DATOS DEL CERRAJERO — editar SOLO este archivo.
   Todo lo demás de la página se completa solo desde acá.
   ============================================================ */
window.CERRAJERIA = {
  nombre: "Cerrajería",

  // WhatsApp / teléfono en formato internacional SIN signos (celular argentino: 549 + código de área + número)
  telefono: "5491162651262",
  // Cómo se ve el número en pantalla
  telefonoVisible: "11 6265-1262",

  // Zona principal (aparece en el título de la página)
  zona: "Buenos Aires",
  // Barrios y localidades donde trabaja (se muestran como botones)
  barrios: [
    "Flores", "Floresta", "Villa Luro", "Liniers", "Mataderos",
    "Caballito", "Almagro", "Villa Devoto", "Ramos Mejía", "Haedo", "Morón"
  ],

  // ESTADO ACTUAL (cambiar esta palabra cuando se sale a un trabajo):
  //   "disponible"  -> "Disponible ahora, llamame"
  //   "en-trabajo"  -> "Estoy en un trabajo, escribime por WhatsApp y te respondo apenas salga"
  //   "fuera"       -> "Ahora no atiendo, dejame tu mensaje y te respondo apenas pueda"
  estado: "disponible",

  // Formas de pago (dejar "" para ocultar la pregunta)
  pagos: "efectivo, transferencia o Mercado Pago",

  // Datos legales del titular (opcional; si están vacíos no se muestran)
  titular: "",   // Ej.: "Juan Pérez"
  cuit: ""       // Ej.: "20-12345678-9"
};
