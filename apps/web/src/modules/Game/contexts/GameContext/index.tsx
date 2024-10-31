import { createContext, useReducer, useContext, useMemo, type Dispatch, type PropsWithChildren } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useDebounce, useEffectOnce, useUpdateEffect } from '@/hooks/usehooks-ts'

import { type GameState, type GameActions, gameReducer } from './reducers/gameReducer'
import { clickAction } from './actions/clickAction'
import { getRecordAction } from './actions/getRecordAction'
import { pushRecordAction } from './actions/pushRecordAction'

const GameContext = createContext<{ state: GameState; dispatch: Dispatch<GameActions> } | null>(null)

function GameProvider({ children }: PropsWithChildren) {
  const authCtx = useAuth()
  if (!authCtx?.user) throw new Error('GameProvider require user to be authenticated')
  const userId = authCtx.user.id

  const initialState: GameState = {
    stats: {
      counter: 0,
      highscore: 0,
      peaks: [],
      totalClicks: 0,
    },
    currentRecord: null,
    isUpdating: false,
    errorMessage: '',
    userId,
  }
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // This effects runs only on mount
  useEffectOnce(() => {
    getRecordAction(dispatch, state)
  })

  // This effect runs right after 2000ms user stoped clicking. It pushes postponedStats to the DB
  /*
    FIXME: If clicks stoped at the same value as before effect won't run.
           Changig it to totalClicks fires effect twice because it is being reset after request
  */
  const debouncedCounter = useDebounce(state.stats.counter, 2000)
  useUpdateEffect(() => {
    pushRecordAction(dispatch, state)
  }, [debouncedCounter])

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export { GameProvider, useGame, clickAction }
