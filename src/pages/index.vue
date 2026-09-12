<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>{{ t('paymentMethods.pageTitle') }}</q-toolbar-title>
        <q-btn-dropdown flat :label="locale.toUpperCase()" icon="language">
          <q-list>
            <q-item clickable v-close-popup @click="locale = 'es'">
              <q-item-section>Español</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="locale = 'en-US'">
              <q-item-section>English</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
          <template #top-right>
            <q-btn :label="t('paymentMethods.newButton')" color="primary" @click="onOpenCreate" />
          </template>

          <template #body-cell-isActive="props">
            <q-td :props="props">
              <q-toggle
                :model-value="props.row.isActive"
                @update:model-value="onToggleStatus(props.row.id)"
              />
            </q-td>
          </template>

          <template #body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm">
              <q-btn icon="edit" flat round dense @click="onOpenEdit(props.row)" />
              <q-btn
                icon="delete"
                flat
                round
                dense
                color="negative"
                @click="onConfirmDelete(props.row)"
              />
            </q-td>
          </template>
        </q-table>

        <payment-method-form-dialog
          v-model="isFormDialogOpen"
          :payment-method="selectedPaymentMethod"
          :loading="isSavingForm"
          @submit="onSaveForm"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import type { QTableColumn } from 'quasar';
import { usePaymentMethodsStore } from '../stores/payment-methods-store';
import { useAuthStore } from '../stores/auth-store';
import FiltersPanel, { type FilterFieldConfig } from '../components/filters/FiltersPanel.vue';
import PaymentMethodFormDialog from '../components/payment-methods/PaymentMethodFormDialog.vue';
import type { PaymentMethod, PaymentMethodFormPayload } from '../models/payment-method';
import type { PaymentMethodFilters } from '../services/mock/payment-methods.mock';
import { formatDateToDMY } from '@/utils/date';

const router = useRouter();
const { t, locale } = useI18n();
const $q = useQuasar();
const authStore = useAuthStore();
const paymentMethodsStore = usePaymentMethodsStore();
const isSavingForm = ref(false);

const filterFields = computed<FilterFieldConfig[]>(() => [
  { name: 'name', label: t('paymentMethods.filters.name'), type: 'text' },
  {
    name: 'type',
    label: t('paymentMethods.filters.type'),
    type: 'select',
    options: [
      { label: t('paymentMethods.types.credit_card'), value: 'credit_card' },
      { label: t('paymentMethods.types.debit_card'), value: 'debit_card' },
      { label: t('paymentMethods.types.bank_transfer'), value: 'bank_transfer' },
      { label: t('paymentMethods.types.digital_wallet'), value: 'digital_wallet' },
    ],
  },
  {
    name: 'isActive',
    label: t('paymentMethods.filters.status'),
    type: 'select',
    options: [
      { label: t('paymentMethods.status.active'), value: 'true' },
      { label: t('paymentMethods.status.inactive'), value: 'false' },
    ],
  },
  { name: 'createdAt', label: t('paymentMethods.filters.createdAt'), type: 'date' },
]);

const columns = computed<QTableColumn<PaymentMethod>[]>(() => [
  {
    name: 'name',
    label: t('paymentMethods.table.name'),
    field: 'name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'type',
    label: t('paymentMethods.table.type'),
    field: 'type',
    align: 'left',
    sortable: true,
    format: (val: string) => t(`paymentMethods.types.${val}`),
  },
  { name: 'isActive', label: t('paymentMethods.table.status'), field: 'isActive', align: 'center' },
  {
    name: 'createdAt',
    label: t('paymentMethods.table.createdAt'),
    field: 'createdAt',
    align: 'left',
    sortable: true,
    format: (val: string) => formatDateToDMY(val),
  },
  { name: 'actions', label: t('paymentMethods.table.actions'), field: 'id', align: 'center' },
]);

const isFormDialogOpen = ref(false);
const selectedPaymentMethod = ref<PaymentMethod | null>(null);

onMounted(() => {
  void paymentMethodsStore.fetchAll();
});

/**
 * Recibe los filtros ya validados y sin campos vacíos, normaliza
 * el campo de estado a boolean, y delega la búsqueda al store.
 *
 * @param filters - valores de filtro emitidos por el panel
 */
function onSearch(filters: Record<string, unknown>) {
  const normalized: PaymentMethodFilters = { ...filters };

  if (typeof filters.isActive === 'string') {
    normalized.isActive = filters.isActive === 'true';
  }

  if (typeof filters.createdAt === 'string') {
    const [day, month, year] = filters.createdAt.split('/');
    normalized.createdAt = `${year}-${month}-${day}`;
  }

  void paymentMethodsStore.fetchAll(normalized);
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

/**
 * Abre el diálogo en modo creación.
 */
function onOpenCreate() {
  selectedPaymentMethod.value = null;
  isFormDialogOpen.value = true;
}

/**
 * Abre el diálogo en modo edición, precargando el registro seleccionado.
 *
 * @param row - método de pago a editar
 */
function onOpenEdit(row: PaymentMethod) {
  selectedPaymentMethod.value = row;
  isFormDialogOpen.value = true;
}

/**
 * Crea o edita el método de pago según el modo activo del diálogo.
 * Controla el loader del botón mientras dura la petición real al store.
 *
 * @param payload - datos validados emitidos por el formulario
 */
async function onSaveForm(payload: PaymentMethodFormPayload) {
  isSavingForm.value = true;
  try {
    if (selectedPaymentMethod.value) {
      await paymentMethodsStore.update(selectedPaymentMethod.value.id, payload);
    } else {
      await paymentMethodsStore.create(payload);
    }
    isFormDialogOpen.value = false;
    $q.notify({ type: 'positive', message: t('paymentMethods.form.savedSuccess') });
  } catch {
    // el store ya dispara la notificación de error global
  } finally {
    isSavingForm.value = false;
  }
}

/**
 * Solicita confirmación explícita antes de eliminar un registro.
 *
 * @param row - método de pago a eliminar
 */
function onConfirmDelete(row: PaymentMethod) {
  $q.dialog({
    title: t('paymentMethods.delete.title'),
    message: t('paymentMethods.delete.message', { name: row.name }),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    void paymentMethodsStore.remove(row.id);
  });
}
</script>

<route lang="yaml">
{ meta: { requiresAuth: true } }
</route>
