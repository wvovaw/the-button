import { Separator } from "@/components/ui/Separator";
import { useGame } from "../contexts/GameContext";
import { Badge } from "@/components/ui/Badge";

export default function Stats() {
  const game = useGame();
  if (!game) throw new Error("Game context isn't available");

  const { counter, resetsCount, totalClicks } = game.state.stats;
  const { currentRecord } = game.state;

  return (
    <>
      <div className="absolute left-10 top-20 text-base font-semibold text-muted">
        <p className="">clicks: {counter}</p>
        <p className="">resets: {resetsCount}</p>
        <p className="">total clicks: {totalClicks}</p>
        <Separator />
        <div className="">
          record: {currentRecord ? JSON.stringify(currentRecord?.highScore) : <Badge variant="outline">Newbee</Badge>}
        </div>
      </div>
    </>
  );
}
