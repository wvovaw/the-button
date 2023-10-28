import { useCallback } from "react";
import { clickAction, useGame } from "../contexts/GameContext";
import useSound from "use-sound";
import clickInSound from "@/assets/sounds/click-in.mp3";
import clickOutSound from "@/assets/sounds/click-out.mp3";

export default function TheButton() {
  const game = useGame();
  if (!game) throw new Error("Game context isn't available");

  const [playClickIn] = useSound(clickInSound, { volume: 0.5 });
  const [playClickOut] = useSound(clickOutSound, { volume: 0.3 });

  const { dispatch } = game;
  const { isUpdating } = game.state;
  const { counter } = game.state.stats;

  const handleClick = useCallback(() => {
    clickAction(dispatch, game.state);
  }, [dispatch, game.state]);

  return (
    <div className="grid h-full w-full place-content-center">
      <button
        className="
        aspect-[1/0.96]
        w-64 
        cursor-pointer 
        select-none 
        rounded-full 
        border-[1px]
        border-secondary
        bg-primary
        font-heading
        text-9xl
        text-primary-foreground/70
        transition-all
        duration-200
        [box-shadow:0_12px_0_0_hsl(var(--accent)),0_20px_0_0_hsl(var(--secondary))]
        enabled:active:translate-y-2
        enabled:active:border-b-[0px]
        enabled:active:[box-shadow:0_0px_0_0_hsl(var(--accent)),0_0px_0_0_hsl(var(--secondary))]
        disabled:cursor-not-allowed
        disabled:bg-primary/70
        disabled:[box-shadow:0_12px_0_0_hsl(var(--accent)/0.6),0_20px_0_0_hsl(var(--secondary)/0.9)]
        md:w-[30w]
        xl:w-[500px]
        "
        onClick={handleClick}
        onMouseDown={() => playClickIn()}
        onMouseUp={() => playClickOut()}
        disabled={isUpdating}
      >
        {counter}
      </button>
    </div>
  );
}
