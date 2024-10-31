import { type Dispatch } from 'react'
import { SetHighscore, type GameActions, type GameState } from '../reducers/gameReducer'

export async function clickAction(dispatch: Dispatch<GameActions>, state: GameState) {
  const P = Math.round(Math.random() * 100)
  if (P >= state.stats.counter) {
    dispatch({ type: 'INCREMENT' })
    setHighscore(dispatch, state)
  } else dispatch({ type: 'RESET' })
}

function setHighscore(dispatch: Dispatch<SetHighscore>, state: GameState) {
  if (state.stats.highscore) {
    if (state.stats.counter + 1 > state.stats.highscore)
      dispatch({ type: 'SET_HIGHSCORE', payload: { highscore: state.stats.counter + 1 } })
  } else if (state.currentRecord) {
    if (state.stats.counter + 1 > state.currentRecord.highscore)
      dispatch({ type: 'SET_HIGHSCORE', payload: { highscore: state.stats.counter + 1 } })
  } else dispatch({ type: 'SET_HIGHSCORE', payload: { highscore: state.stats.counter + 1 } })
}
