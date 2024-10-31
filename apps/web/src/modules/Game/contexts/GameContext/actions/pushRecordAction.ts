import { Dispatch } from "react";
import { setStatsAction } from "./setStatsAction";
import { type Stats, type GameActions, type GameState } from "../reducers/gameReducer";
import { type RecordData, type PostRecordRequesData } from "@/api/types";
import { createRecord } from "@/api/services/createRecord";
import { updateRecord } from "@/api/services/updateRecord";

/**
 * If player has no record sign in the DB - creates new record
 * If they have it - updates it
 *
 * Flushes statsQueue and reset stats after
 */
export async function pushRecordAction(dispatch: Dispatch<GameActions>, state: GameState) {
  console.log("Updating record data");
  dispatch({ type: "UPDATE:START" });

  try {
    let record : RecordData;
    if (!state.currentRecord) {
      record = await upsertRecord("create", state.stats);
    } else {
      record = await upsertRecord("update", state.stats);
    }
    dispatch({ type: "UPDATE:RESOLVE", payload: { record } });

    setStatsAction(dispatch, {
      ...state.stats,
      peaks: [],
      highscore: null,
      totalClicks: state.stats.counter,
    });
  } catch (e: unknown) {
    dispatch({
      type: "UPDATE:REJECT",
      payload: { errorMessage: "Failed updating record data" },
    });
  }
}

async function upsertRecord(variant: "create" | "update", stats: Stats) {
  const data: PostRecordRequesData = {};
  if (stats.highscore) data.highscore = stats.highscore;
  if (stats.peaks.length > 0) data.peaks = stats.peaks;
  if (stats.totalClicks) data.clicks = stats.totalClicks - stats.counter;

  if (variant === "create") return await createRecord(data);
  else if (variant === "update") return await updateRecord(data);
  else throw new Error("Unknown update record variant");
}
