<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="confirm-dialog-card">
      <q-card-section class="row items-center q-pb-none">
        <q-icon name="warning" color="negative" size="28px" class="q-mr-sm" />
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="text-grey-8">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md q-pt-none">
        <q-btn flat rounded :label="cancelLabel" @click="onCancelClick" />
        <q-btn unelevated rounded color="negative" :label="okLabel" @click="onOkClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'

/**
 * Diálogo de confirmación.
 */
defineProps<{
  title: string
  message: string
  okLabel: string
  cancelLabel: string
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOkClick() {
  onDialogOK()
}

function onCancelClick() {
  onDialogCancel()
}
</script>

<style lang="scss" scoped>
.confirm-dialog-card {
  border-radius: 16px;
  min-width: 320px;
  max-width: 90vw;
}
</style>
