<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccessibilityStore } from '../src/stores/accessibility-store'

const accessibilityStore = useAccessibilityStore()

onMounted(() => {
  accessibilityStore.applyFontScale(accessibilityStore.fontScale)
})
</script>
