import { type Dispatch } from "react";
import { type GameActions, type Stats } from "../reducers/gameReducer";
import { createRecord } from "@/api/services/createRecord";

export async function createRecordAction(dispatch: Dispatch<GameActions>, stats: Stats) {
  console.log("Creating record: ", stats);
  dispatch({ type: "UPDATE:START" });
  try {
    const record = await createRecord({ score: stats.counter });
    dispatch({ type: "UPDATE:RESOLVE", payload: { record } });
    // TODO: check if this is AxiosError with status that record can't be created
  } catch (e: unknown) {
    dispatch({
      type: "UPDATE:REJECT",
      payload: { errorMessage: "Failed creating new record." },
    });
  }
}
