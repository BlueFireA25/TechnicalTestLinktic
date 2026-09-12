<template>
  <q-dialog :model-value="modelValue" @update:model-value="onDialogUpdate" persistent>
    <q-card style="width: 400px" class="form-dialog-card">
      <q-card-section class="row items-center q-pb-none">
        <q-icon name="account_balance_wallet" color="primary" size="24px" class="q-mr-sm" />
        <div class="text-h6">
          {{
            isEditMode ? t('paymentMethods.form.editTitle') : t('paymentMethods.form.createTitle')
          }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-form ref="formRef" class="q-gutter-md" @submit.prevent="onSubmit">
          <q-input
            v-model="form.name"
            outlined
            rounded
            :label="t('paymentMethods.form.name')"
            :rules="[(val) => !!val || t('paymentMethods.form.nameRequired')]"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>

          <q-select
            v-model="form.type"
            outlined
            rounded
            :label="t('paymentMethods.form.type')"
            :options="typeOptions"
            emit-value
            map-options
            :rules="[(val) => !!val || t('paymentMethods.form.typeRequired')]"
          >
            <template #prepend>
              <q-icon name="category" />
            </template>
          </q-select>

          <q-input
            v-model="form.description"
            outlined
            rounded
            :label="t('paymentMethods.form.description')"
            type="textarea"
            autogrow
          >
            <template #prepend>
              <q-icon name="notes" />
            </template>
          </q-input>

          <div class="row justify-end q-gutter-sm">
            <q-btn :label="t('paymentMethods.form.cancel')" flat rounded @click="onCancel" />
            <q-btn
              :label="t('paymentMethods.form.save')"
              type="submit"
              color="primary"
              rounded
              unelevated
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { QForm } from 'quasar';
import type {
  PaymentMethod,
  PaymentMethodFormPayload,
  PaymentMethodType,
} from '../../models/payment-method';

const props = defineProps<{
  modelValue: boolean;
  paymentMethod: PaymentMethod | null;
  loading?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  submit: [payload: PaymentMethodFormPayload];
}>();

const { t } = useI18n();
const formRef = ref<QForm | null>(null);
const isEditMode = computed(() => props.paymentMethod !== null);

const typeOptions = computed<{ label: string; value: PaymentMethodType }[]>(() => [
  { label: t('paymentMethods.types.credit_card'), value: 'credit_card' },
  { label: t('paymentMethods.types.debit_card'), value: 'debit_card' },
  { label: t('paymentMethods.types.bank_transfer'), value: 'bank_transfer' },
  { label: t('paymentMethods.types.digital_wallet'), value: 'digital_wallet' },
]);

const form = reactive<PaymentMethodFormPayload>({
  name: '',
  type: 'credit_card',
  description: '',
});

/**
 * Precarga el formulario cuando se abre el diálogo: con los datos del
 * registro seleccionado en modo edición, o vacío en modo creación.
 */
watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) return;

    if (props.paymentMethod) {
      form.name = props.paymentMethod.name;
      form.type = props.paymentMethod.type;
      form.description = props.paymentMethod.description ?? '';
    } else {
      form.name = '';
      form.type = 'credit_card';
      form.description = '';
    }

    formRef.value?.resetValidation();
  },
);

/**
 * Notifica al padre el cierre del diálogo (usado por el propio v-model de q-dialog).
 */
function onDialogUpdate(value: boolean) {
  emit('update:modelValue', value);
}

function onCancel() {
  emit('update:modelValue', false);
}

/**
 * Valida el formulario y emite el evento 'saved' con el payload listo
 * para que el componente padre decida si crea o edita.
 */
async function onSubmit() {
  const isValid = await formRef.value?.validate();
  if (!isValid) return;

  emit('submit', { ...form });
}

defineExpose({ form });
</script>

<style lang="scss" scoped>
.form-dialog-card {
  border-radius: 16px;
}
</style>
