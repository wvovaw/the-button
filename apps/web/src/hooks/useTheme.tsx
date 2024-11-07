import { useEffectOnce, useLocalStorage } from '@/hooks/usehooks-ts'

const THEMES_LIST = ['light', 'dark'] as const
type Theme = (typeof THEMES_LIST)[number]

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark')

  useEffectOnce(() => {
    setRootClass(theme)
  })

  function set(newTheme: Theme) {
    setTheme(newTheme)
    setRootClass(newTheme, theme)
  }

  function setRootClass(value: string, toRemove?: string) {
    const rootElement = document.querySelector('html')
    if (rootElement) {
      if (toRemove) rootElement.classList.remove(toRemove)
      rootElement.classList.add(value)
    }
  }

  return {
    theme,
    themes: THEMES_LIST,
    set,
  }
}
