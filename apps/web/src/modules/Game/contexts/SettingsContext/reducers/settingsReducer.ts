export interface SettingsState {
  sounds: boolean
}

export interface ToggleSound { type: 'TOGGLE_SOUND' }

export type SettingsActions = ToggleSound

export function settingsReducer(state: SettingsState, action: SettingsActions): SettingsState {
  switch (action.type) {
    case 'TOGGLE_SOUND': {
      return {
        sounds: !state.sounds,
      }
    }
    default: {
      throw new Error(`Unknown settings action`)
    }
  }
}
