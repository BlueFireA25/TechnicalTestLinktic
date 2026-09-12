/**
 * Modelo de dominio para un método de pago.
 * Se centraliza aquí para reutilizarlo en mocks, store y componentes.
 */
export type PaymentMethodType = 'credit_card' | 'debit_card' | 'bank_transfer' | 'digital_wallet'

export interface PaymentMethod {
  id: string
  name: string
  type: PaymentMethodType
  description?: string | undefined
  isActive: boolean
  createdAt: string // ISO date
}

export interface PaymentMethodFormPayload {
  name: string
  type: PaymentMethodType
  description?: string
}
