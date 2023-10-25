import { Dispatch } from "react";
import { createRecordAction } from "./createRecordAction";
import { updateRecordAction } from "./updateRecordAction";
import { setStatsAction } from "./setStatsAction";
import { type GameActions, type GameState } from "../reducers/gameReducer";

/**
 * If player has no record sign in the DB - creates new record
 * If they have it - updates it
 *
 * Flushes statsQueue and reset stats after
 */
export async function syncRecordAction(dispatch: Dispatch<GameActions>, state: GameState) {
  if (state.postponedStats) {
    if (!state.currentRecord) {
      createRecordAction(dispatch, state.postponedStats);
    } else {
      updateRecordAction(dispatch, state.postponedStats);
    }
    dispatch({ type: "SET_POSTPONED_STATS", payload: { stats: null } });
    setStatsAction(dispatch, {
      counter: state.stats.counter,
      resetsCount: state.stats.resetsCount - state.postponedStats.resetsCount,
      totalClicks: state.stats.totalClicks - state.postponedStats.totalClicks,
    });
  }
}
