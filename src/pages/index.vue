<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md">
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
import type { QTableColumn } from 'quasar';
import { usePaymentMethodsStore } from '../stores/payment-methods-store';
import type { PaymentMethod } from '../models/payment-method';

const paymentMethodsStore = usePaymentMethodsStore();

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
 * Delega al store el cambio de estado del registro seleccionado.
 *
 * @param id - identificador del método de pago
 */
function onToggleStatus(id: string) {
  void paymentMethodsStore.toggleStatus(id);
}
</script>
