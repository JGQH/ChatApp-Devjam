import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [tsconfigPaths()],
  base: isProduction ? '/ChatApp-Devjam/' : '/'
})
