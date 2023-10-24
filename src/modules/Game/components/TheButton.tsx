import { useCallback } from "react";
import { clickAction, useGame } from "../contexts/GameContext";

export default function TheButton() {
  const game = useGame();
  if (!game) throw new Error("Game context isn't available");

  const { dispatch } = game;
  const { isUpdating } = game.state;
  const { counter } = game.state.stats;

  const handleClick = useCallback(() => {
    clickAction(dispatch, game.state);
  }, [dispatch, game.state]);

  return (
    <div className="grid h-full w-full place-content-center">
      <button
        className="aspect-square w-64 select-none rounded-full bg-primary font-heading text-9xl text-primary-foreground disabled:cursor-not-allowed disabled:bg-primary/70 md:w-[30vw] xl:w-[500px]"
        onClick={handleClick}
        disabled={isUpdating}
      >
        {counter}
      </button>
    </div>
  );
}
