# Prueba Técnica - LinkTic

Simula un módulo de autenticación y gestión de métodos de pago sobre datos mockeados.

## Stack técnico

- Vue 3 (Composition API + `<script setup>`)
- Quasar Framework
- Pinia
- Vue Router
- TypeScript

## Instalación y ejecución local

1. Clonar el repositorio y ubicarse en la rama `feature/prueba-tecnica`:
   ```bash
   git clone <https://github.com/BlueFireA25/TechnicalTestLinktic.git>
   cd <TechnicalTestLinktic>
   git checkout feature/prueba-tecnica
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Levantar el entorno de desarrollo:
   ```bash
   quasar dev
   ```
   La aplicación queda en `http://localhost:9000` (o el puerto que indique la terminal).

4. Credenciales de acceso definidas en el mock de autenticación:
   ```
   Usuario:    admin
   Contraseña: admin123
   ```

### Autenticación
- Como no existe backend real ni JWT válido el "token" es un string fijo (`fake-jwt-token`) que se guarda en `sessionStorage` únicamente para sobrevivir a un refresh de página mientras dura la sesión del navegador.
- Solo se contempla un usuario, definido dentro del mock (`admin` / `admin123`).
- El cierre de sesión es local (limpia el estado de Pinia y `sessionStorage`), no hay invalidación de token en un servidor.

### Modelo de datos: `PaymentMethod`
```ts
export interface PaymentMethod {
  id: string
  name: string
  type: PaymentMethodType
  description?: string | undefined
  isActive: boolean
  createdAt: string // ISO date
}

type PaymentMethodType = 'credit_card' | 'debit_card' | 'bank_transfer' | 'digital_wallet'
```
- `type` se modeló como un **enum de string**, pensando que si hay un backend real este catálogo vendría de una tabla de tipos de método de pago. Se definieron 4 valores de ejemplo.
- `createdAt` se asume generado por el "servidor" (mock) en el momento de creación, no editable por el usuario.
- El dataset mockeado vive en memoria durante la sesión del navegador (se reinicia al recargar la página), ya que no se pidió persistencia real.

### Arquitectura del mock
- Toda la simulación  pasa por un (`services/mockApi.ts`), que agrega un pequeño delay artificial y permite forzar fallos, esto para que el manejo de loaders y errores sea similar a un escenario real.
- El mock de métodos de pago (`payment-methods.mock.ts`) es la única fuente de datos, no hay lógica de mocks dispersa en componentes ni en el store. El store solo gestiona llamadas y actualiza el estado global.

### Componente de filtros
- Se creo un componente que recibe unos props (`name`, `label`, `type`, `options`, `required`). Esto permite reutilizarlo en cualquier otro módulo.
- Soporta los tipos de cambio (`text` y `select`, y `date`).

### Formulario de creación/edición
- Un mismo componente maneja ambos modos, es decir, si recibe un `paymentMethod` por prop, precarga y opera en modo edición. Si recibe `null`, opera en modo creación. La decisión de si el padre invoca `create` o `update` en el store vive en la página, no en el formulario, para mantenerlo separado del negocio igual que el componente de filtros.

### Comentarios adicionales
- Se utilizaron los plugins de quasar Dialog y Notify
- Adicional se agregaron traducciones (inglés y español)