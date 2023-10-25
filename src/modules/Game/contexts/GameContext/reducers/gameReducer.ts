import { type RecordData } from "@/api/types";

export type Stats = {
  counter: number;
  totalClicks: number; // Counts every clickAction untill a new record
  resetsCount: number; // How many times the button counter has been reset to 0
};

export type GameState = {
  stats: Stats;
  postponedStats: Stats | null; // To save last clicked highscore. It's being send to the DB if user is inactive for a while
  currentRecord: RecordData | null; // Current player's record (gets it from the DB)
  isUpdating: boolean; // True when asyn update record job is on
  errorMessage: string; // Not empty if record request rejects
  userId: number;
};

export type Increment = { type: "INCREMENT" };
export type Reset = { type: "RESET" };
export type SetStats = { type: "SET_STATS"; payload: { stats: Stats } };
export type SetPostponedStats = { type: "SET_POSTPONED_STATS"; payload: { stats: Stats | null } };
export type UpdateRecordStart = { type: "UPDATE:START" };
export type UpdateRecordResolve = { type: "UPDATE:RESOLVE"; payload: { record: RecordData } };
export type UpdateRecordReject = { type: "UPDATE:REJECT"; payload: { errorMessage: string } };

export type GameActions =
  | Increment
  | Reset
  | SetStats
  | SetPostponedStats
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
    case "SET_POSTPONED_STATS": {
      return {
        ...state,
        postponedStats: action.payload.stats,
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
