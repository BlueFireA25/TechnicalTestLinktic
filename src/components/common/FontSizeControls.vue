<template>
  <div class="row items-center q-gutter-xs">
    <q-btn
      flat
      dense
      round
      label="A-"
      class="font-size-btn"
      :disable="!accessibilityStore.canDecrease"
      @click="accessibilityStore.decreaseFontSize()"
    >
      <q-tooltip>{{ t('accessibility.decreaseFont') }}</q-tooltip>
    </q-btn>

    <q-btn
      flat
      dense
      round
      label="A+"
      class="font-size-btn"
      :disable="!accessibilityStore.canIncrease"
      @click="accessibilityStore.increaseFontSize()"
    >
      <q-tooltip>{{ t('accessibility.increaseFont') }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAccessibilityStore } from '../../stores/accessibility-store'

const { t } = useI18n()
const accessibilityStore = useAccessibilityStore()
</script>

<style lang="scss" scoped>
// Tamaño fijo a propósito: el control de escala no debe escalar con su propia acción.
.font-size-btn {
  font-weight: 700;
  font-size: 13px;
  min-width: 36px;
}
</style>
