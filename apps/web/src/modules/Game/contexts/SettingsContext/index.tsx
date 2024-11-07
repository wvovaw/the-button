import { useEffectOnce, useLocalStorage, useUpdateEffect } from '@/hooks/usehooks-ts'
import { createContext, type Dispatch, type PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import { type SettingsActions, settingsReducer, type SettingsState } from './reducers/settingsReducer'

const SettingsContext = createContext<{ state: SettingsState; dispatch: Dispatch<SettingsActions> } | null>(null)

function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useLocalStorage<SettingsState | null>('game-settings', null)

  const initialState: SettingsState = {
    sounds: true,
  }

  const [state, dispatch] = useReducer(settingsReducer, settings ?? initialState)

  useEffectOnce(() => {
    if (!settings) setSettings(state)
  })

  useUpdateEffect(() => {
    setSettings(state)
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export { SettingsProvider, useSettings }
