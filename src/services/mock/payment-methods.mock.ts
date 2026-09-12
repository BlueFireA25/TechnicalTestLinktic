/**
 * Datos y lógica mock del módulo de métodos de pago.
 * Mantiene el "dataset" en memoria para simular persistencia entre operaciones.
 */
import { simulateRequest } from '../mockApi';
import type { PaymentMethod, PaymentMethodFormPayload } from '../../models/payment-method';

let paymentMethods: PaymentMethod[] = [
  {
    id: crypto.randomUUID(),
    name: 'Visa Empresarial',
    type: 'credit_card',
    isActive: true,
    createdAt: '2025-01-10T10:00:00.000Z',
  },
  {
    id: crypto.randomUUID(),
    name: 'Nequi',
    type: 'digital_wallet',
    isActive: true,
    createdAt: '2025-02-20T15:30:00.000Z',
  },
  {
    id: crypto.randomUUID(),
    name: 'Cuenta Bancolombia',
    type: 'bank_transfer',
    isActive: false,
    createdAt: '2025-03-05T09:15:00.000Z',
  },
];

export interface PaymentMethodFilters {
  name?: string;
  type?: string;
  isActive?: boolean;
  createdAt?: string; // formato YYYY-MM-DD
}

/**
 * Simula la obtención del listado de métodos de pago, aplicando
 * filtros opcionales sobre el dataset en memoria.
 *
 * @param filters - criterios de búsqueda opcionales
 */
export function fetchPaymentMethods(filters: PaymentMethodFilters = {}): Promise<PaymentMethod[]> {
  const filtered = paymentMethods.filter((item) => {
    const matchesName = filters.name
      ? item.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    const matchesType = filters.type ? item.type === filters.type : true;
    const matchesStatus =
      filters.isActive !== undefined ? item.isActive === filters.isActive : true;
    const matchesDate = filters.createdAt
      ? item.createdAt.slice(0, 10) === filters.createdAt
      : true;

    return matchesName && matchesType && matchesStatus && matchesDate;
  });

  return simulateRequest(filtered, { delayMs: 500 });
}

/**
 * Simula el cambio de estado (activo/inactivo) de un método de pago.
 *
 * @param id - identificador del registro a modificar
 */
export function toggleStatusRequest(id: string): Promise<PaymentMethod> {
  const index = paymentMethods.findIndex((method) => method.id === id);
  const current = paymentMethods[index];

  if (!current) {
    return simulateRequest(null as never, { failureRate: 1 });
  }

  const updated: PaymentMethod = {
    ...current,
    isActive: !current.isActive,
  };
  paymentMethods[index] = updated;

  return simulateRequest(updated, { delayMs: 50 });
}

/**
 * Simula la creación de un nuevo método de pago.
 *
 * @param payload - datos del formulario de creación
 */
export function createPaymentMethodRequest(
  payload: PaymentMethodFormPayload,
): Promise<PaymentMethod> {
  const newItem: PaymentMethod = {
    id: crypto.randomUUID(),
    name: payload.name,
    type: payload.type,
    description: payload.description,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  paymentMethods = [newItem, ...paymentMethods];
  return simulateRequest(newItem, { delayMs: 500 });
}

/**
 * Simula la edición de un método de pago existente.
 *
 * @param id - identificador del registro a editar
 * @param payload - nuevos datos del formulario
 */
export function updatePaymentMethodRequest(
  id: string,
  payload: PaymentMethodFormPayload,
): Promise<PaymentMethod> {
  const index = paymentMethods.findIndex((method) => method.id === id);
  const current = paymentMethods[index];

  if (!current) {
    return simulateRequest(null as never, { failureRate: 1 });
  }

  const updated: PaymentMethod = {
    ...current,
    name: payload.name,
    type: payload.type,
    description: payload.description,
  };
  paymentMethods[index] = updated;

  return simulateRequest(updated, { delayMs: 500 });
}

/**
 * Simula la eliminación de un método de pago del dataset.
 *
 * @param id - identificador del registro a eliminar
 */
export function deletePaymentMethodRequest(id: string): Promise<void> {
  paymentMethods = paymentMethods.filter((method) => method.id !== id);
  return simulateRequest(undefined, { delayMs: 400 });
}
