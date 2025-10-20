import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['dist', 'src/components/ui', 'src/hooks/usehooks-ts'],
  stylistic: false,
  formatters: true,
  react: true,
  typescript: true,
})
