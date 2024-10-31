import { Dispatch } from "react";
import { type SetStats, type Stats } from "../reducers/gameReducer";

export function setStatsAction(dispatch: Dispatch<SetStats>, stats: Stats) {
  dispatch({ type: "SET_STATS", payload: { stats } });
}
