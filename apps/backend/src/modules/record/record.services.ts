import type {
  CreateRecordInput,
  GetRecordByOwnderIdInput,
  GetRecordsInput,
  UpdateRecordInput,
} from './record.schemas'
import type { NewRecord, Record, User } from '@/db/schema'
import { asc, count, desc, eq } from 'drizzle-orm'
import db from '@/db'
import { records, users } from '@/db/schema'

export type UserRecord = Record & { owner: User }

export async function createRecord(data: CreateRecordInput & { ownerId: number }): Promise<UserRecord> {
  try {
    const recordData = {
      ownerId: data.ownerId,
      average: 0,
      averageWeight: 0,
      totalClicks: 0,
      totalResets: 0,
      highscore: 0,
    }

    if (data.highscore)
      recordData.highscore = data.highscore
    if (data.clicks)
      recordData.totalClicks = data.clicks
    if (data.peaks) {
      const weight = data.peaks.length
      recordData.average = data.peaks.reduce((acc, cur) => acc + cur) / weight
      recordData.averageWeight = weight
      recordData.totalResets = weight
    }

    const [newRecord] = await db.insert(records).values(recordData).returning()

    if (!newRecord) {
      throw new Error('Failed to create record')
    }

    const [recordWithOwner] = await db
      .select()
      .from(records)
      .innerJoin(users, eq(records.ownerId, users.id))
      .where(eq(records.id, newRecord.id))

    if (!recordWithOwner) {
      throw new Error('Failed to fetch created record with owner')
    }

    return {
      ...recordWithOwner.records,
      owner: recordWithOwner.users,
    }
  }
  catch (e: any) {
    if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw new Error(`The user with id ${data.ownerId} already has a Record associated with it`, {
        cause: 409,
      })
    }
    throw e
  }
}

export async function updateRecord(data: UpdateRecordInput & { ownerId: number }) {
  try {
    const updateData: Partial<NewRecord> = {}
    const currentRecord = await db
      .query
      .records
      .findFirst({
        where: table => (eq(table.ownerId, data.ownerId)),
      })

    if (!currentRecord)
      throw new Error('Can not update record. It\'s not found', { cause: 409 })

    if (data.clicks) {
      updateData.totalClicks = (currentRecord?.totalClicks ?? 0) + data.clicks
    }

    if (data.highscore)
      updateData.highscore = data.highscore

    if (data.peaks) {
      const { average, averageWeight, totalResets } = currentRecord ?? {
        average: 0,
        averageWeight: 0,
        totalResets: 0,
      }

      const w1 = averageWeight
      const X1 = average * averageWeight

      const X2 = data.peaks.reduce((acc, cur) => acc + cur)
      const w2 = data.peaks.length

      updateData.average = (X1 + X2) / (w1 + w2)
      updateData.averageWeight = w1 + w2
      updateData.totalResets = totalResets + data.peaks.length
    }

    if (Object.keys(updateData).length !== 0) {
      const [updatedRecord] = await db
        .update(records)
        .set(updateData)
        .where(eq(records.ownerId, data.ownerId))
        .returning()

      if (!updatedRecord) {
        throw new Error(`Record not found for ownerId ${data.ownerId}`, {
          cause: 404,
        })
      }
    }

    const [recordWithOwner] = await db
      .select()
      .from(records)
      .innerJoin(users, eq(records.ownerId, users.id))
      .where(eq(records.id, currentRecord.id))

    if (!recordWithOwner) {
      throw new Error('Failed to fetch updated record with owner')
    }

    return {
      ...recordWithOwner.records,
      owner: recordWithOwner.users,
    }
  }
  catch (e: unknown) {
    if (e instanceof Error)
      throw e
  }
}

export async function deleteRecord(ownerId: number) {
  try {
    const [result] = await db
      .delete(records)
      .where(eq(records.ownerId, ownerId))
      .returning()

    if (!result) {
      throw new Error(`Record not found.`, {
        cause: 404,
      })
    }
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      throw e
    }
  }
}

export async function getRecords(data: GetRecordsInput) {
  const page = data.page ?? 0
  const perPage = data.perPage ?? 25
  const offset = page * perPage

  const items = await db
    .select({
      id: records.id,
      highscore: records.highscore,
      totalClicks: records.totalClicks,
      totalResets: records.totalResets,
      average: records.average,
      owner: {
        id: users.id,
        name: users.name,
      },
      createdAt: records.createdAt,
      updatedAt: records.updatedAt,
    })
    .from(records)
    .innerJoin(users, eq(records.ownerId, users.id))
    .orderBy(desc(records.highscore), asc(records.totalResets))
    .limit(perPage)
    .offset(offset)

  const [totalCount] = await db
    .select({ count: count() })
    .from(records)

  if (!totalCount) {
    throw new Error('Failed to get total count')
  }

  return {
    data: items,
    meta: {
      page,
      perPage,
      itemsCount: totalCount.count,
    },
  }
}

export async function getRecordByOwnerId(params: GetRecordByOwnderIdInput) {
  try {
    const [result] = await db
      .select()
      .from(records)
      .innerJoin(users, eq(records.ownerId, users.id))
      .where(eq(records.ownerId, Number(params.ownerId)))
      .limit(1)

    if (!result) {
      throw new Error(`Record not found for ownerId ${params.ownerId}`, {
        cause: 404,
      })
    }

    return {
      ...result.records,
      owner: result.users,
    }
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      throw e
    }
  }
}
