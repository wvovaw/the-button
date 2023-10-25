import { Dispatch } from "react";
import { Stats, type SetPostponedStats, type GameActions, type GameState } from "../reducers/gameReducer";

/**
 * Checks if the new counter is the new record.
 * If it is - enqueues it to sync with DB in a while
 */
export async function postponeStatsAction(dispatch: Dispatch<GameActions>, state: GameState) {
  if (state.currentRecord) {
    if (state.stats.counter > state.currentRecord.highScore) {
      setPostponedStatsAction(dispatch, state.stats);
    }
  } else {
    if (state.postponedStats) {
      if (state.stats.counter > state.postponedStats.counter) setPostponedStatsAction(dispatch, state.stats);
    } else setPostponedStatsAction(dispatch, state.stats);
  }
}

function setPostponedStatsAction(dispatch: Dispatch<SetPostponedStats>, stats: Stats | null) {
  console.log("Enqueue: ", stats);
  dispatch({ type: "SET_POSTPONED_STATS", payload: { stats } });
}
