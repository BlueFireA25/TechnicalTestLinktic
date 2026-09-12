<template>
  <q-layout>
    <q-header elevated class="login-header">
      <q-toolbar>
        <q-toolbar-title />
        <FontSizeControls class="q-mr-sm" />
        <q-btn-dropdown flat :label="locale.toUpperCase()" icon="language">
          <q-list>
            <q-item clickable v-close-popup @click="locale = 'es'">
              <q-item-section>{{ t('languageSwitcher.spanish') }}</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="locale = 'en-US'">
              <q-item-section>{{ t('languageSwitcher.english') }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container class="login-bg">
      <q-page class="flex flex-center">
        <q-card flat class="login-card login-card-enter">
          <q-card-section class="text-center q-pt-lg">
            <q-img
              src="../assets/logo.png"
              width="150px"
              height="100px"
              fit="contain"
              alt="Logo de la aplicación"
              class="login-logo"
            >
              <template #error>
                <div class="logo-error-fallback absolute-full flex flex-center column">
                  <q-icon name="image_not_supported" size="28px" color="primary" />
                  <div class="text-caption text-grey-8 q-mt-xs text-center q-px-sm">
                    {{ t('auth.login.logoLoadError') }}
                  </div>
                </div>
              </template>
            </q-img>
            <div class="text-h6 app-heading q-mt-sm">{{ t('auth.login.title') }}</div>
            <div class="text-caption text-grey-7">
              {{ t('paymentMethods.pageTitle') }}
            </div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onSubmit" class="q-gutter-md">
              <q-input
                v-model="username"
                outlined
                rounded
                :label="t('auth.login.username')"
                :rules="[(val) => !!val || t('auth.login.usernameRequired')]"
              >
                <template #prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                v-model="password"
                outlined
                rounded
                type="password"
                :label="t('auth.login.password')"
                :rules="[(val) => !!val || t('auth.login.passwordRequired')]"
              >
                <template #prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>

              <div>
                <q-btn
                  :label="t('auth.login.submit')"
                  type="submit"
                  color="primary"
                  rounded
                  unelevated
                  :loading="authStore.isLoading"
                  class="full-width q-py-xs"
                />
              </div>
            </q-form>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="demo-credentials row items-center q-pa-sm">
              <q-icon name="info" color="positive" size="20px" class="q-mr-sm" />
              <div class="text-caption text-grey-8 col">
                <div><strong>admin</strong> · <strong>admin123</strong></div>
              </div>
              <q-btn
                icon="content_paste"
                flat
                round
                dense
                color="positive"
                @click="onFillDemoCredentials"
              >
                <q-tooltip class="bg-primary text-body2">{{
                  t('auth.login.fillDemoCredentials')
                }}</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from '../stores/auth-store';
import FontSizeControls from '../components/common/FontSizeControls.vue';

const { t, locale } = useI18n();
const username = ref('');
const password = ref('');

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

/**
 * Autocompleta los campos del formulario con las credenciales de ejemplo
 */
function onFillDemoCredentials() {
  username.value = 'admin';
  password.value = 'admin123';
}

async function onSubmit() {
  try {
    await authStore.login({ username: username.value, password: password.value });
    void router.push('/');
  } catch {
    $q.notify({ type: 'negative', message: t('auth.login.invalidCredentials') });
  }
}
</script>

<style lang="scss" scoped>
.login-header {
  background: transparent;
  box-shadow: none;
  color: $primary;
}

.login-bg {
  background: #f4f6fb;
}

.login-logo {
  border-radius: 12px;
  overflow: hidden;
}

.logo-error-fallback {
  background: rgba(30, 58, 95, 0.06);
  border: 1px dashed rgba(30, 58, 95, 0.25);
  border-radius: 12px;
}

.login-card {
  width: 380px;
  max-width: 90vw;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(30, 58, 95, 0.08);
}

.demo-credentials {
  background: rgba(22, 163, 74, 0.08);
  border: 1px solid rgba(22, 163, 74, 0.25);
  border-radius: 10px;
}
</style>
