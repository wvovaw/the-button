import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['dist'],
  stylistic: false,
  formatters: true,
  react: true,
  typescript: true,
})
