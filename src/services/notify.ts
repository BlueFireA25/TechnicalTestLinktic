/**
 * Wrapper sobre Quasar Notify para centralizar el feedback de errores globales.
 * Permite que los stores notifiquen fallos sin que las vistas manejen esa lógica.
 */
import { Notify } from 'quasar';
import { i18n } from '../boot/i18n';

/**
 * Muestra una notificación de error genérica al usuario, traducida
 * según el idioma activo de la aplicación.
 *
 * @param key - clave de traducción del mensaje (ej. 'paymentMethods.errors.fetch')
 */
export function notifyError(key: string): void {
  Notify.create({ type: 'negative', message: i18n.global.t(key) });
}
