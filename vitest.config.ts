import autoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    autoImport({
      imports: ['vitest'],
      dts: true,
    }),
  ],
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov', 'json'],
    },
  },
})
