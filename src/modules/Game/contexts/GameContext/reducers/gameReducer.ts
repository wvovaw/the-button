import { type RecordData } from "@/api/types";

export type Stats = {
  counter: number;
  highscore: number | null; // Last highscore
  totalClicks: number; // Counts every clickAction untill a new record
  peaks: number[]; // Save here every value that was reached before counter reset
};

export type GameState = {
  stats: Stats;
  currentRecord: RecordData | null; // Current player's record (gets it from the DB)
  isUpdating: boolean; // True when asyn update record job is on
  errorMessage: string; // Not empty if record request rejects
  userId: number;
};

export type Increment = { type: "INCREMENT" };
export type SetHighscore = { type: "SET_HIGHSCORE"; payload: { highscore: number | null } };
export type Reset = { type: "RESET" };
export type SetStats = { type: "SET_STATS"; payload: { stats: Stats } };
export type UpdateRecordStart = { type: "UPDATE:START" };
export type UpdateRecordResolve = { type: "UPDATE:RESOLVE"; payload: { record: RecordData } };
export type UpdateRecordReject = { type: "UPDATE:REJECT"; payload: { errorMessage: string } };

export type GameActions =
  | Increment
  | SetHighscore
  | Reset
  | SetStats
  | UpdateRecordStart
  | UpdateRecordResolve
  | UpdateRecordReject;

export function gameReducer(state: GameState, action: GameActions): GameState {
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
    case "SET_HIGHSCORE": {
      return {
        ...state,
        stats: {
          ...state.stats,
          highscore: action.payload.highscore,
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
          peaks: [...state.stats.peaks, state.stats.counter],
        },
      };
    }
    case "SET_STATS": {
      return {
        ...state,
        stats: action.payload.stats,
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
