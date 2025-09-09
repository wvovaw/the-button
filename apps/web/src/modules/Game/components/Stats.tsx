import type { PropsWithChildren, ReactNode } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useGame } from '../contexts/GameContext'

export default function Stats() {
  const game = useGame()
  if (!game) throw new Error("Game context isn't available")

  const { currentRecord, isUpdating } = game.state

  return (
    <div className="inset-x-center top-12 select-none">
      <div className="flex flex-row gap-5 font-semibold">
        <StatsColumn>
          {isUpdating ? (
            <>
              <StatsRow label="Highscore" value={<Skeleton className="bg-accent h-2 w-6" />} />
              <StatsRow label="Total clicks" value={<Skeleton className="bg-accent h-2 w-8" />} />
              <StatsRow label="AVG" value={<Skeleton className="bg-accent h-2 w-6" />} />
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
  )
}

function StatsRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid h-7 w-full grid-cols-2">
      <div className="flex place-items-center justify-center text-lg font-normal whitespace-nowrap">{label}</div>
      <div className="font-heading flex place-content-center items-center text-center text-lg">{value}</div>
    </div>
  )
}

function StatsColumn({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row gap-5 text-base font-semibold">
      <div className="grid place-content-center">{children}</div>
    </div>
  )
}
