import type { Statistics } from './statistics.schemas'
import { avg, count, sum } from 'drizzle-orm'
import db from '@/db'
import { records } from '@/db/schema'

export async function getStatistics(): Promise<Statistics> {
  const [stats] = await db
    .select({
      totalClicks: sum(records.totalClicks),
      avgHighscore: avg(records.highscore),
      playersCount: count(records.ownerId),
    })
    .from(records)

  return {
    avgHighscore: Number.parseInt(stats?.avgHighscore ?? '0'),
    playersCount: stats?.playersCount ?? 0,
    totalClicks: Number(stats?.totalClicks ?? '0'),
  }
}
