<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card style="width: 350px">
          <q-card-section>
            <div class="text-h6">Iniciar sesión</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onSubmit" class="q-gutter-md">
              <q-input
                v-model="username"
                label="Usuario"
                :rules="[(val) => !!val || 'El usuario es obligatorio']"
              />
              <q-input
                v-model="password"
                type="password"
                label="Contraseña"
                :rules="[(val) => !!val || 'La contraseña es obligatoria']"
              />

              <div>
                <q-btn
                  label="Ingresar"
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
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from '../stores/auth-store';

const username = ref('');
const password = ref('');

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

/**
 * Envía las credenciales al store. Si el login falla,
 * se muestra una notificación de error al usuario.
 */
async function onSubmit() {
  try {
    await authStore.login({ username: username.value, password: password.value });
    void router.push('/');
  } catch {
    $q.notify({ type: 'negative', message: 'Usuario o contraseña incorrectos' });
  }
}
</script>
