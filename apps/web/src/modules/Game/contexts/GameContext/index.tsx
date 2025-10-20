import type {Dispatch, PropsWithChildren} from 'react';
import type {GameActions, GameState} from './reducers/gameReducer';
import { createContext,   use, useMemo, useReducer, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'

import { useDebounce, useEffectOnce, useUpdateEffect } from '@/hooks/usehooks-ts'
import { GAME_CONFIG } from '../../constants'
import { clickAction } from './actions/clickAction'
import { getRecordAction } from './actions/getRecordAction'
import { pushRecordAction } from './actions/pushRecordAction'
import {  gameReducer  } from './reducers/gameReducer'

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
    isInitialLoadComplete: false,
  }
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const lastPushedCounter = useRef<number>(0)

  // This effects runs only on mount
  useEffectOnce(() => {
    getRecordAction(dispatch, state)
  })

  // This effect runs right after 2000ms user stoped clicking. It pushes postponedStats to the DB
  /*
    FIXME: If clicks stoped at the same value as before effect won't run.
           Changig it to totalClicks fires effect twice because it is being reset after request
  */
  const debouncedCounter = useDebounce(state.stats.counter, GAME_CONFIG.UPDATE_DEBOUNCE)
  useUpdateEffect(() => {
    // Only push record if initial load is complete, we're not currently updating, and counter actually changed
    if (state.isInitialLoadComplete && !state.isUpdating && debouncedCounter !== lastPushedCounter.current) {
      lastPushedCounter.current = debouncedCounter
      pushRecordAction(dispatch, state)
    }
  }, [debouncedCounter])

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <GameContext value={value}>{children}</GameContext>
}

function useGame() {
  const context = use(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export { clickAction, GameProvider, useGame }
