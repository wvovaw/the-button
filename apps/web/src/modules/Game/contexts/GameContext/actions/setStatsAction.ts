import type { Dispatch } from 'react'
import type { SetStats, Stats } from '../reducers/gameReducer'

export function setStatsAction(dispatch: Dispatch<SetStats>, stats: Stats) {
  dispatch({ type: 'SET_STATS', payload: { stats } })
}
