import type { Dispatch } from 'react'
import type { ToggleSound } from '../reducers/settingsReducer'

export function toggleSoundAction(dispatch: Dispatch<ToggleSound>) {
  dispatch({ type: 'TOGGLE_SOUND' })
}
