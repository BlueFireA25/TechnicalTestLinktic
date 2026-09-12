/**
 * Store central del módulo de métodos de pago.
 * Único responsable de invocar los mocks y mantener el estado global de la lista.
 */
import { defineStore } from 'pinia';
import {
  fetchPaymentMethods,
  toggleStatusRequest,
  createPaymentMethodRequest,
  updatePaymentMethodRequest,
  deletePaymentMethodRequest,
  type PaymentMethodFilters,
} from '../services/mock/payment-methods.mock';
import { notifyError } from '../services/notify';
import type { PaymentMethod, PaymentMethodFormPayload } from '../models/payment-method';

interface PaymentMethodsState {
  items: PaymentMethod[];
  isLoading: boolean;
  activeFilters: PaymentMethodFilters;
}

export const usePaymentMethodsStore = defineStore('paymentMethods', {
  state: (): PaymentMethodsState => ({
    items: [],
    isLoading: false,
    activeFilters: {},
  }),

  actions: {
    /**
     * Carga el listado de métodos de pago aplicando los filtros recibidos.
     * Guarda los filtros usados para poder reutilizarlos tras crear/editar/eliminar.
     *
     * @param filters - criterios de búsqueda opcionales
     */
    async fetchAll(filters?: PaymentMethodFilters) {
      this.isLoading = true;
      const appliedFilters = filters ?? this.activeFilters;
      this.activeFilters = appliedFilters;
      try {
        this.items = await fetchPaymentMethods(appliedFilters);
      } catch (error) {
        notifyError('paymentMethods.errors.fetch');
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Activa o desactiva un método de pago y refleja el cambio en el estado local.
     *
     * @param id - identificador del registro a modificar
     */
    async toggleStatus(id: string) {
      try {
        const updated = await toggleStatusRequest(id);
        const index = this.items.findIndex((item) => item.id === id);
        if (index !== -1 && updated !== null) {
          this.items[index] = updated;
        }
      } catch (error) {
        notifyError('paymentMethods.errors.toggleStatus');
        throw error;
      }
    },

    /**
     * Crea un nuevo método de pago y lo agrega al inicio del listado local.
     *
     * @param payload - datos del formulario de creación
     */
    async create(payload: PaymentMethodFormPayload) {
      try {
        const created = await createPaymentMethodRequest(payload);
        this.items = [created, ...this.items];
      } catch (error) {
        notifyError('paymentMethods.errors.create');
        throw error;
      }
    },

    /**
     * Edita un método de pago existente y actualiza el listado local.
     *
     * @param id - identificador del registro a editar
     * @param payload - nuevos datos del formulario
     */
    async update(id: string, payload: PaymentMethodFormPayload) {
      try {
        const updated = await updatePaymentMethodRequest(id, payload);
        const index = this.items.findIndex((item) => item.id === id);
        if (index !== -1 && updated !== null) {
          this.items[index] = updated;
        }
      } catch (error) {
        notifyError('paymentMethods.errors.update');
        throw error;
      }
    },

    /**
     * Elimina un método de pago y lo remueve del listado local.
     *
     * @param id - identificador del registro a eliminar
     */
    async remove(id: string) {
      try {
        await deletePaymentMethodRequest(id);
        this.items = this.items.filter((item) => item.id !== id);
      } catch (error) {
        notifyError('paymentMethods.errors.delete');
        throw error;
      }
    },
  },
});
