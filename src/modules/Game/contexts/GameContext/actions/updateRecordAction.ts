import { type Dispatch } from "react";
import { AxiosError } from "axios";
import { type GameActions, type Stats } from "../reducers/gameReducer";
import { createRecordAction } from "./createRecordAction";
import { updateRecord } from "@/api/services/updateRecord";

export async function updateRecordAction(dispatch: Dispatch<GameActions>, stats: Stats) {
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
