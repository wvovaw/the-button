import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  type Dispatch,
  type PropsWithChildren,
} from "react";
import { useDebounce,useEffectOnce, useUpdateEffect } from "@/lib/usehooks-ts";
import { type RecordData } from "@/api/types";
import { AxiosError } from "axios";
import { getRecordByUserId } from "@/api/services/getRecordByUserId";
import { updateRecord } from "@/api/services/updateRecord";
import { createRecord } from "@/api/services/createRecord";
import { useAuth } from "@/hooks/useAuth";

type Stats = {
  counter: number;
  totalClicks: number; // Counts every clickAction untill a new record
  resetsCount: number; // How many times the button counter has been reset to 0
};

type GameState = {
  stats: Stats;
  currentRecord: RecordData | null; // Current player's record (gets it from the DB)
  queuedRecord: Stats | null; // To save highscore between button resets
  isUpdating: boolean; // True when asyn update record job is on
  errorMessage: string; // Not empty if record request rejects
};

type Increment = { type: "INCREMENT" };
type Reset = { type: "RESET" };
type SetStats = { type: "SET_STATS"; payload: { stats: Stats } };
type EnqueueStats = { type: "ENQUEUE_STATS"; payload: { stats: Stats | null } };
type UpdateRecordStart = { type: "UPDATE:START" };
type UpdateRecordResolve = { type: "UPDATE:RESOLVE"; payload: { record: RecordData } };
type UpdateRecordReject = { type: "UPDATE:REJECT"; payload: { errorMessage: string } };

type GameActions =
  | Increment
  | Reset
  | SetStats
  | EnqueueStats
  | UpdateRecordStart
  | UpdateRecordResolve
  | UpdateRecordReject;

const GameContext = createContext<{ state: GameState; dispatch: Dispatch<GameActions> } | null>(null);

function gameReducer(state: GameState, action: GameActions): GameState {
  switch (action.type) {
    case "INCREMENT": {
      return {
        ...state,
        stats: {
          ...state.stats,
          counter: state.stats.counter + 1,
          totalClicks: state.stats.totalClicks + 1,
        },
      };
    }
    case "RESET": {
      return {
        ...state,
        stats: {
          ...state.stats,
          counter: 0,
          totalClicks: state.stats.totalClicks + 1,
          resetsCount: state.stats.resetsCount + 1,
        },
      };
    }
    case "SET_STATS": {
      return {
        ...state,
        stats: action.payload.stats,
      };
    }
    case "ENQUEUE_STATS": {
      return {
        ...state,
        queuedRecord: action.payload.stats,
      };
    }
    case "UPDATE:START": {
      return { ...state, isUpdating: true };
    }
    case "UPDATE:RESOLVE": {
      return { ...state, isUpdating: false, currentRecord: action.payload.record };
    }
    case "UPDATE:REJECT": {
      return { ...state, isUpdating: false, errorMessage: action.payload.errorMessage };
    }
    default: {
      throw new Error(`Unknown action`);
    }
  }
}

async function clickAction(dispatch: Dispatch<GameActions>, state: GameState) {
  const P = Math.round(Math.random() * 100);
  if (P >= state.stats.counter) {
    dispatch({ type: "INCREMENT" });
  } else dispatch({ type: "RESET" });
}

async function createRecordAction(dispatch: Dispatch<GameActions>, stats: Stats) {
  console.log("Creating record: ", stats);
  dispatch({ type: "UPDATE:START" });
  try {
    const record = await createRecord({ score: stats.counter });
    dispatch({ type: "UPDATE:RESOLVE", payload: { record } });
  } catch (e: unknown) {
    dispatch({
      type: "UPDATE:REJECT",
      payload: { errorMessage: "Failed creating new record." },
    });
  }
}

async function updateRecordAction(dispatch: Dispatch<GameActions>, stats: Stats) {
  console.log("Updating with: ", stats);
  dispatch({ type: "UPDATE:START" });
  try {
    const record = await updateRecord({ attempts: stats.resetsCount, newScore: stats.counter });
    dispatch({ type: "UPDATE:RESOLVE", payload: { record } });
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      switch (e.response?.status) {
        case 404: {
          // This means that resouce not found (It wasn't created at all and this needs to be created)
          await createRecordAction(dispatch, stats);
          break;
        }
        default: {
          dispatch({
            type: "UPDATE:REJECT",
            payload: { errorMessage: `Failed on initial fetching record data. Code: ${e.response?.status}` },
          });
        }
      }
      dispatch({ type: "UPDATE:REJECT", payload: { errorMessage: "Update record request failed." } });
    }
  }
}

function setStatsAction(dispatch: Dispatch<SetStats>, stats: Stats) {
  dispatch({ type: "SET_STATS", payload: { stats } });
}

function enqueueStatsAction(dispatch: Dispatch<EnqueueStats>, stats: Stats | null) {
  console.log("Enqueue: ", stats);
  dispatch({ type: "ENQUEUE_STATS", payload: { stats } });
}

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
    queuedRecord: null,
    isUpdating: false,
    errorMessage: "",
  };
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const getCurrentRecord = async () => {
    try {
      console.log("Getting current record");
      dispatch({ type: "UPDATE:START" });
      const record = await getRecordByUserId(userId);
      dispatch({ type: "UPDATE:RESOLVE", payload: { record } });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const status = e.response?.status;
        if (status === 404) {
          console.log("Welcome to the game. Click this button 😈. Click this again");
          dispatch({ type: "UPDATE:REJECT", payload: { errorMessage: "" } });
        } else dispatch({ type: "UPDATE:REJECT", payload: { errorMessage: "Failed on initial fetching record data" } });
      } else {
        dispatch({ type: "UPDATE:REJECT", payload: { errorMessage: "Unhandled errror" } });
      }
    }
  };

  // This effects runs on mount
  useEffectOnce(() => {
    getCurrentRecord();
  })

  // This effect runs every time counter changes. It just saves another new record to sync it in a while
  useUpdateEffect(() => {
    if (state.currentRecord) {
      if (state.stats.counter > state.currentRecord.highScore) {
        enqueueStatsAction(dispatch, state.stats);
      }
    } else {
      if (state.queuedRecord) {
        if (state.stats.counter > state.queuedRecord.counter) enqueueStatsAction(dispatch, state.stats);
      } else enqueueStatsAction(dispatch, state.stats);
    }
  }, [state.stats.counter]);

  // This effect runs right after 2000ms user stoped clicking. It pushes queuedRecord to the DB
  const debouncedCounter = useDebounce(state.stats.counter, 2000);
  useUpdateEffect(() => {
    if (!state.queuedRecord) return;
    if (!state.currentRecord) {
      createRecordAction(dispatch, state.queuedRecord);
    } else {
      updateRecordAction(dispatch, state.queuedRecord);
    }
    enqueueStatsAction(dispatch, null);
    setStatsAction(dispatch, {
      counter: state.stats.counter,
      resetsCount: state.stats.resetsCount - state.queuedRecord.resetsCount,
      totalClicks: state.stats.totalClicks - state.queuedRecord.totalClicks,
    });
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

export { GameProvider, useGame, updateRecordAction, clickAction };
