<template>
  <q-layout>
    <q-page-container class="bg-primary">
      <q-page class="flex flex-center text-center">
        <div>
          <div class="not-found-code">404</div>

          <div class="text-h5 app-heading text-white q-mt-sm">
            {{ t('notFound.title') }}
          </div>
          <div class="text-body2 text-grey-4 q-mt-xs">
            {{ t('notFound.subtitle') }}
          </div>

          <q-btn
            class="q-mt-xl"
            color="white"
            text-color="black"
            unelevated
            rounded
            icon="home"
            :to="'/'"
            :label="t('notFound.goHome')"
            no-caps
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.not-found-code {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 22vh;
  line-height: 1;
  color: rgba(255, 255, 255);
}
</style>
