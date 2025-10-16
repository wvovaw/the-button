import antfu from '@antfu/eslint-config'

export default antfu({
  javascript: {
    overrides: {
      'no-console': 'warn',
      'antfu/no-top-level-await': 'off',
    },
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  ignores: ['.drizzle'],
})
