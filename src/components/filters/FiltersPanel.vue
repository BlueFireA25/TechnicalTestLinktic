<template>
  <q-form ref="formRef" class="row q-col-gutter-md items-end">
    <div v-for="field in fields" :key="field.name" class="col-12 col-sm-3">
      <q-input
        v-if="field.type === 'text'"
        v-model="values[field.name]"
        :label="field.label"
        :rules="field.required ? [(val) => !!val || t('paymentMethods.filters.fieldRequired')] : []"
      />

      <q-select
        v-else-if="field.type === 'select'"
        v-model="values[field.name]"
        :label="field.label"
        :options="field.options"
        emit-value
        map-options
        :rules="field.required ? [(val) => !!val || t('paymentMethods.filters.fieldRequired')] : []"
      />

      <q-input
        v-else-if="field.type === 'date'"
        v-model="values[field.name]"
        :label="field.label"
        mask="##/##/####"
        placeholder="DD/MM/AAAA"
        :rules="field.required ? [(val) => !!val || t('paymentMethods.filters.fieldRequired')] : []"
      >
        <template #append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="values[field.name]" mask="DD/MM/YYYY">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Cerrar" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div class="col-12 col-sm-auto q-gutter-sm">
      <q-btn :label="t('paymentMethods.filters.search')" color="primary" @click="onSearch" />
      <q-btn :label="t('paymentMethods.filters.clear')" flat @click="onClear" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';
import type { QForm } from 'quasar';
import { useI18n } from 'vue-i18n';

/**
 * Opción seleccionable para un campo de tipo select.
 */
export interface FilterFieldOption {
  label: string;
  value: string;
}

/**
 * Configuración de un campo del panel de filtros.
 * El componente padre define la lista de campos, el panel no conoce
 * nada del negocio que los está usando.
 */
export interface FilterFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: FilterFieldOption[];
  required?: boolean;
}

const props = defineProps<{
  fields: FilterFieldConfig[];
}>();

const emit = defineEmits<{
  search: [values: Record<string, string | null>];
  clear: [];
}>();

const { t } = useI18n();
const $q = useQuasar();
const formRef = ref<QForm | null>(null);

/**
 * Estado interno de los valores de cada campo, inicializado vacío
 * a partir de la configuración recibida por props.
 */
const values = reactive<Record<string, string | null>>(
  Object.fromEntries(props.fields.map((field) => [field.name, null])),
);

/**
 * Valida los campos obligatorios y, si todo es correcto, notifica
 * al padre solo con los campos que tengan un valor (excluye vacíos).
 */
async function onSearch() {
  const isValid = await formRef.value?.validate();

  if (!isValid) {
    $q.notify({ type: 'warning', message: t('paymentMethods.filters.validationError') });
    return;
  }

  const filledValues = Object.fromEntries(
    Object.entries(values).filter(([, val]) => val !== null && val !== ''),
  );

  emit('search', filledValues);
}

/**
 * Restablece todos los campos a su estado vacío y notifica al padre.
 */
function onClear() {
  for (const field of props.fields) {
    values[field.name] = null;
  }
  formRef.value?.resetValidation();
  emit('clear');
}
</script>
