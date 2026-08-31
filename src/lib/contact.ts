export const CONTACT_EMAIL = 'cristianminni@gmail.com';

// Número real en formato local (para mostrar) y en formato internacional (para wa.me / tel:)
export const CONTACT_PHONE_DISPLAY = '+54 9 261 692-9778';
export const CONTACT_PHONE_TEL = '+5492616929778';
export const CONTACT_PHONE_WHATSAPP = '5492616929778';

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola! Vi la web de Tekno.Dev y quiero más información sobre sus servicios.';

export const whatsappLink = (mensaje: string = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${CONTACT_PHONE_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
