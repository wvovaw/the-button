import { useGame } from "../contexts";

export default function ErrorIndicator() {
  const game = useGame();
  if (!game) throw new Error("Game context isn't available");

  const { errorMessage } = game.state;

  return <div className="absolute bottom-12 left-20 text-destructive">{errorMessage}</div>;
}
