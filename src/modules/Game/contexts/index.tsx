import { createContext, useReducer, useContext, useMemo, type Dispatch, type PropsWithChildren } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce, useEffectOnce, useUpdateEffect } from "@/hooks/usehooks-ts";

import { type GameState, type GameActions, gameReducer } from "./GameContext/reducers/gameReducer";
import { clickAction } from "./GameContext/actions/clickAction";
import { getRecordAction } from "./GameContext/actions/getRecordAction";
import { postponeStatsAction } from "./GameContext/actions/postponeStatsAction";
import { syncRecordAction } from "./GameContext/actions/syncRecordAction";

const GameContext = createContext<{ state: GameState; dispatch: Dispatch<GameActions> } | null>(null);

function GameProvider({ children }: PropsWithChildren) {
  const authCtx = useAuth();
  if (!authCtx?.user) throw new Error("GameProvider require user to be authenticated");
  const userId = authCtx.user.id;

  const initialState: GameState = {
    stats: {
      counter: 0,
      resetsCount: 0,
      totalClicks: 0,
    },
    currentRecord: null,
    postponedStats: null,
    isUpdating: false,
    errorMessage: "",
    userId,
  };
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // This effects runs only on mount
  useEffectOnce(() => {
    getRecordAction(dispatch, state);
  });

  // This effect runs every time counter changes
  useUpdateEffect(() => {
    postponeStatsAction(dispatch, state);
  }, [state.stats.counter]);

  // This effect runs right after 2000ms user stoped clicking. It pushes postponedStats to the DB
  const debouncedCounter = useDebounce(state.stats.counter, 2000);
  useUpdateEffect(() => {
    syncRecordAction(dispatch, state);
  }, [debouncedCounter]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export { GameProvider, useGame, clickAction };
