/**
 * Punto único de simulación de llamadas asíncronas a un backend.
 * Todo mock de la app (auth, payment-methods, etc.) debe pasar por aquí
 * para mantener centralizada la lógica de red simulada.
 */

interface SimulateOptions {
  delayMs?: number
  failureRate?: number // 0 a 1
}

/**
 * Envuelve una respuesta en una promesa que simula latencia de red
 * y puede fallar aleatoriamente según failureRate.
 *
 * @param response - dato a resolver si la simulación es exitosa
 * @param options - configuración de delay y probabilidad de fallo
 * @returns promesa que resuelve con la respuesta o rechaza con un Error
 */
export function simulateRequest<T>(
  response: T,
  options: SimulateOptions = {}
): Promise<T> {
  const { delayMs = 600, failureRate = 0 } = options

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new Error('Error simulado en la petición'))
        return
      }
      resolve(response)
    }, delayMs)
  })
}
