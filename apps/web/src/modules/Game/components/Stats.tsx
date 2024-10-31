import { PropsWithChildren, type ReactNode } from 'react'
import { useGame } from '../contexts/GameContext'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Stats() {
  const game = useGame()
  if (!game) throw new Error("Game context isn't available")

  // const { , totalClicks } = game.state.stats;
  const { currentRecord, isUpdating } = game.state

  return (
    <>
      <div className="inset-x-center top-12 select-none">
        <div className="flex flex-row gap-5 font-semibold text-muted">
          <StatsColumn>
            {isUpdating ? (
              <>
                <StatsRow label="Highscore" value={<Skeleton className="h-2 w-6 bg-accent" />} />
                <StatsRow label="Total clicks" value={<Skeleton className="h-2 w-8 bg-accent" />} />
                <StatsRow label="AVG" value={<Skeleton className="h-2 w-6 bg-accent" />} />
              </>
            ) : currentRecord ? (
              <>
                <StatsRow label="Highscore" value={currentRecord.highscore} />
                <StatsRow label="Total clicks" value={currentRecord.totalClicks} />
                <StatsRow label="AVG" value={currentRecord.average.toFixed(2)} />
              </>
            ) : (
              <div className="text-sm">No data. Click!</div>
            )}
          </StatsColumn>
        </div>
      </div>
    </>
  )
}

function StatsRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid h-7 w-full grid-cols-2">
      <div className="flex place-items-center justify-center whitespace-nowrap text-lg font-normal">{label}</div>
      <div className="flex place-content-center items-center text-center font-heading text-lg">{value}</div>
    </div>
  )
}

function StatsColumn({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row gap-5 text-base font-semibold text-muted">
      <div className="grid place-content-center">{children}</div>
    </div>
  )
}
