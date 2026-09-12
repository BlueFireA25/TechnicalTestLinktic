/**
 * Formatea una fecha ISO a formato día/mes/año (DD/MM/YYYY).
 *
 * @param isoDate - fecha en formato ISO (ej. "2025-03-05T09:15:00.000Z")
 */
export function formatDateToDMY(isoDate: string): string {
  const date = new Date(isoDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
