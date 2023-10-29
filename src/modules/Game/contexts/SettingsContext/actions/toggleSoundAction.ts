import { ToggleSound } from "../reducers/settingsReducer";
import { type Dispatch } from "react";

export function toggleSoundAction(dispatch: Dispatch<ToggleSound>) {
  dispatch({type: "TOGGLE_SOUND"});
}