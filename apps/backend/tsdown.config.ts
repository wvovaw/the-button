import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/app.ts'],
  outDir: 'dist',
  format: ['commonjs'],
  sourcemap: true,
  clean: true,
  target: ['node18'],
  platform: 'node',
  plugins: [],
})
