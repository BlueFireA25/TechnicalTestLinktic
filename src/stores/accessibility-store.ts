/**
 * Store de accesibilidad. Controla la escala global de tamaño de fuente
 */
import { defineStore } from 'pinia'

const STORAGE_KEY = 'app_font_scale'
const MIN_SCALE = 0.85
const MAX_SCALE = 1.3
const STEP = 0.1
const BASE_FONT_SIZE_PX = 16

interface AccessibilityState {
  fontScale: number
}

export const useAccessibilityStore = defineStore('accessibility', {
  state: (): AccessibilityState => ({
    fontScale: Number(localStorage.getItem(STORAGE_KEY)) || 1,
  }),

  getters: {
    canIncrease: (state) => state.fontScale < MAX_SCALE,
    canDecrease: (state) => state.fontScale > MIN_SCALE,
  },

  actions: {
    /**
     * Aumenta el tamaño de fuente global un paso, respetando el máximo permitido.
     */
    increaseFontSize() {
      this.applyFontScale(Math.min(MAX_SCALE, Number((this.fontScale + STEP).toFixed(2))))
    },

    /**
     * Disminuye el tamaño de fuente global un paso, respetando el mínimo permitido.
     */
    decreaseFontSize() {
      this.applyFontScale(Math.max(MIN_SCALE, Number((this.fontScale - STEP).toFixed(2))))
    },

    /**
     * Aplica un factor de escala al elemento raíz del documento.
     *
     * @param scale - factor de escala (1 = tamaño normal)
     */
    applyFontScale(scale: number) {
      this.fontScale = scale
      document.documentElement.style.fontSize = `${BASE_FONT_SIZE_PX * scale}px`
      localStorage.setItem(STORAGE_KEY, String(scale))
    },
  },
})
