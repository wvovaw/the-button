import { useCallback } from "react";
import { clickAction, useGame } from "../contexts/GameContext";
import useSound from "use-sound";
import clickInSound from "@/assets/sounds/click-in.mp3";
import clickOutSound from "@/assets/sounds/click-out.mp3";
import { useSettings } from "../contexts/SettingsContext";

export default function TheButton() {
  const game = useGame();
  if (!game) throw new Error("Game context isn't available");

  const settings = useSettings();
  if (!settings) throw new Error("Settings context isn't available");

  const { dispatch } = game;
  const { isUpdating } = game.state;
  const { counter } = game.state.stats;
  const isSoundOn = settings.state.sounds;

  const [playClickIn] = useSound(clickInSound, { volume: 0.5 });
  const [playClickOut] = useSound(clickOutSound, { volume: 0.3 });

  const handleClick = useCallback(() => {
    clickAction(dispatch, game.state);
  }, [dispatch, game.state]);

  const handleMouseDown = useCallback(() => {
    if (isSoundOn) playClickIn();
  }, [isSoundOn, playClickIn]);

  const handleMouseUp = useCallback(() => {
    if (isSoundOn) playClickOut();
  }, [isSoundOn, playClickOut]);

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
        md:duration-150
        [box-shadow:0_12px_0_0_hsl(var(--accent)),0_20px_0_0_hsl(var(--secondary))]
        md:[box-shadow:0_16px_0_0_hsl(var(--accent)),0_30px_0_0_hsl(var(--secondary))]
        enabled:active:translate-y-2
        enabled:active:border-b-[0px]
        enabled:active:[box-shadow:0_0px_0_0_hsl(var(--accent)),0_0px_0_0_hsl(var(--secondary))]
        disabled:cursor-not-allowed
        disabled:bg-primary/70
        disabled:[box-shadow:0_12px_0_0_hsl(var(--accent)/0.6),0_20px_0_0_hsl(var(--secondary)/0.9)]
        md:disabled:[box-shadow:0_16px_0_0_hsl(var(--accent)),0_30px_0_0_hsl(var(--secondary))]
        md:w-96
        "
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={isUpdating}
      >
        {counter}
      </button>
    </div>
  );
}
