import { type Dispatch } from "react";
import { type GameActions, type GameState } from "../reducers/gameReducer";

export async function clickAction(dispatch: Dispatch<GameActions>, state: GameState) {
  const P = Math.round(Math.random() * 100);
  if (P >= state.stats.counter) {
    dispatch({ type: "INCREMENT" });
  } else dispatch({ type: "RESET" });
}
