<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title />
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
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center">
        <q-card style="width: 350px">
          <q-card-section>
            <div class="text-h6">{{ t('auth.login.title') }}</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onSubmit" class="q-gutter-md">
              <q-input
                v-model="username"
                :label="t('auth.login.username')"
                :rules="[(val) => !!val || t('auth.login.usernameRequired')]"
              />
              <q-input
                v-model="password"
                type="password"
                :label="t('auth.login.password')"
                :rules="[(val) => !!val || t('auth.login.passwordRequired')]"
              />

              <div>
                <q-btn
                  :label="t('auth.login.submit')"
                  type="submit"
                  color="primary"
                  :loading="authStore.isLoading"
                  class="full-width"
                />
              </div>
            </q-form>
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

const { t, locale } = useI18n();
const username = ref('');
const password = ref('');

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

async function onSubmit() {
  try {
    await authStore.login({ username: username.value, password: password.value });
    void router.push('/');
  } catch {
    $q.notify({ type: 'negative', message: t('auth.login.invalidCredentials') });
  }
}
</script>
