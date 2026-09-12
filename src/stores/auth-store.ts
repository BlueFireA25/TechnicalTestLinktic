/**
 * Store de autenticación. Centraliza el estado de sesión
 * y es el único responsable de invocar la capa de mocks de auth.
 */
import { defineStore } from 'pinia'
import { loginRequest, type LoginPayload } from '../services/mock/auth.mock'

interface AuthState {
  username: string | null
  token: string | null
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    username: null,
    token: null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    /**
     * Ejecuta el login contra el mock y actualiza el estado global.
     * Guarda el token en sessionStorage para sobrevivir refrescos de página.
     *
     * @param payload - credenciales del formulario de login
     */
    async login(payload: LoginPayload) {
      this.isLoading = true
      try {
        const response = await loginRequest(payload)
        if (!response) {
          throw new Error('Login failed')
        }
        this.token = response.token
        this.username = response.username
        sessionStorage.setItem('auth_token', response.token)
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Destruye la sesión actual, tanto en memoria como en sessionStorage.
     */
    logout() {
      this.token = null
      this.username = null
      sessionStorage.removeItem('auth_token')
    },

    /**
     * Restaura la sesión desde sessionStorage al recargar la app.
     * Se llama una sola vez en el boot de la aplicación.
     */
    restoreSession() {
      const token = sessionStorage.getItem('auth_token')
      if (token) {
        this.token = token
      }
    },
  },
})
