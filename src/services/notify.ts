/**
 * Wrapper sobre Quasar Notify para centralizar el feedback de errores globales.
 * Permite que los stores notifiquen fallos sin que las vistas manejen esa lógica.
 */
import { Notify } from 'quasar'

/**
 * Muestra una notificación de error genérica al usuario.
 *
 * @param message - mensaje a mostrar, con un texto por defecto
 */
export function notifyError(message = 'Ocurrió un error inesperado'): void {
  Notify.create({ type: 'negative', message })
}
