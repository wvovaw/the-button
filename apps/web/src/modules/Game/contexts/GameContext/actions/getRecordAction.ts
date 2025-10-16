import type { Dispatch } from 'react'
import type { GameActions, GameState } from '../reducers/gameReducer'
import { AxiosError } from 'axios'
import { getRecordByUserId } from '@/api/services/getRecordByUserId'

export async function getRecordAction(dispatch: Dispatch<GameActions>, state: GameState) {
  try {
    console.log('Getting current record')
    dispatch({ type: 'UPDATE:START' })
    const record = await getRecordByUserId(state.userId)
    dispatch({ type: 'UPDATE:RESOLVE', payload: { record } })
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const status = e.response?.status
      if (status === 404) {
        console.log('Welcome to the game. Click this button 😈. Click this again')
        dispatch({ type: 'UPDATE:REJECT', payload: { errorMessage: '' } })
      } else dispatch({ type: 'UPDATE:REJECT', payload: { errorMessage: 'Failed on initial fetching record data' } })
    } else {
      dispatch({ type: 'UPDATE:REJECT', payload: { errorMessage: 'Unhandled errror' } })
    }
  }
}
