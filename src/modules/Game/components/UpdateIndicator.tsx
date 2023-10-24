import { useGame } from "../contexts/GameContext";
import { Loader2 } from "lucide-react";

export default function UpdateIndicator() {
  const game = useGame();
  if (!game) throw new Error("Game context isn't available");

  const { isUpdating } = game.state;

  return (
    <>
      {isUpdating && (
        <Loader2 className="absolute bottom-10 left-10 isolate h-10 w-10 animate-spin text-accent duration-500" />
      )}
    </>
  );
}
