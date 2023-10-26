import { PropsWithChildren, type ReactNode } from "react";
import { useGame } from "../contexts";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Stats() {
  const game = useGame();
  if (!game) throw new Error("Game context isn't available");

  const { resetsCount, totalClicks } = game.state.stats;
  const { currentRecord, isUpdating } = game.state;

  return (
    <>
      <div className="inset-x-center top-4 select-none">
        <div className="flex flex-row gap-5 text-base font-semibold text-muted">
          <StatsColumn>
            <StatsRow label="Clicks" value={totalClicks} />
            <StatsRow label="Resets" value={resetsCount} />
          </StatsColumn>

          <StatsColumn>
            {isUpdating ? (
              <>
                <StatsRow label="Highscore" value={<Skeleton className="h-2 w-6 bg-accent" />} />
                <StatsRow label="Attempts" value={<Skeleton className="h-2 w-6 bg-accent" />} />
                {/* <StatsRow label="Total clicks" value={<Skeleton className="h-2 w-6 bg-accent" />} /> */}
              </>
            ) : currentRecord ? (
              <>
                <StatsRow label="Highscore" value={currentRecord.highScore} />
                <StatsRow label="Attempts" value={currentRecord.totalAttempts} />
                {/* <StatsRow label="Total clicks" value={currentRecord.totalClicks} /> */}
              </>
            ) : (
              <div className="text-sm">No data. Click!</div>
            )}
          </StatsColumn>
        </div>
      </div>
    </>
  );
}

function StatsRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid h-7 w-full grid-cols-2">
      <div className="flex place-items-center justify-center text-sm font-medium">{label}</div>
      <div className="flex place-content-center items-center text-center">{value}</div>
    </div>
  );
}

function StatsColumn({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row gap-5 text-base font-semibold text-muted">
      <div className="grid place-content-center">{children}</div>
    </div>
  );
}
