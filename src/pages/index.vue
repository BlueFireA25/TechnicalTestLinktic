<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Métodos de pago</q-toolbar-title>
        <q-btn flat round icon="logout" @click="onLogout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <filters-panel
          :fields="filterFields"
          class="q-mb-md"
          @search="onSearch"
          @clear="onClearFilters"
        />

        <q-table
          title="Métodos de pago"
          :rows="paymentMethodsStore.items"
          :columns="columns"
          row-key="id"
          :loading="paymentMethodsStore.isLoading"
        >
          <template #body-cell-isActive="props">
            <q-td :props="props">
              <q-toggle
                :model-value="props.row.isActive"
                @update:model-value="onToggleStatus(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { QTableColumn } from 'quasar';
import { usePaymentMethodsStore } from '../stores/payment-methods-store';
import { useAuthStore } from '../stores/auth-store';
import FiltersPanel, { type FilterFieldConfig } from '../components/filters/FiltersPanel.vue';
import type { PaymentMethod } from '../models/payment-method';

const router = useRouter();
const authStore = useAuthStore();
const paymentMethodsStore = usePaymentMethodsStore();

const filterFields: FilterFieldConfig[] = [
  { name: 'name', label: 'Nombre', type: 'text' },
  {
    name: 'type',
    label: 'Tipo',
    type: 'select',
    options: [
      { label: 'Tarjeta de crédito', value: 'credit_card' },
      { label: 'Tarjeta de débito', value: 'debit_card' },
      { label: 'Transferencia bancaria', value: 'bank_transfer' },
      { label: 'Billetera digital', value: 'digital_wallet' },
    ],
    required: true,
  },
];

const columns: QTableColumn<PaymentMethod>[] = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left', sortable: true },
  { name: 'type', label: 'Tipo', field: 'type', align: 'left', sortable: true },
  { name: 'isActive', label: 'Estado', field: 'isActive', align: 'center' },
  {
    name: 'createdAt',
    label: 'Fecha de creación',
    field: 'createdAt',
    align: 'left',
    sortable: true,
    format: (val: string) => new Date(val).toLocaleDateString(),
  },
];

onMounted(() => {
  void paymentMethodsStore.fetchAll();
});

/**
 * Recibe los filtros ya validados y sin campos vacíos, y delega
 * la búsqueda al store.
 *
 * @param filters - valores de filtro emitidos por el panel
 */
function onSearch(filters: Record<string, unknown>) {
  void paymentMethodsStore.fetchAll(filters);
}

/**
 * Limpia los filtros activos y recarga el listado completo.
 */
function onClearFilters() {
  void paymentMethodsStore.fetchAll({});
}

/**
 * Delega al store el cambio de estado del registro seleccionado.
 *
 * @param id - identificador del método de pago
 */
function onToggleStatus(id: string) {
  void paymentMethodsStore.toggleStatus(id);
}

/**
 * Cierra la sesión actual y redirige al login.
 */
function onLogout() {
  authStore.logout();
  void router.push('/login');
}
</script>

<route lang="yaml">
{ meta: { requiresAuth: true } }
</route>
