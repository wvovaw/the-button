import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateRecordInput, GetRecordByOwnderIdInput, GetRecordsInput, UpdateRecordInput } from './record.schemas'
import { createRecord, deleteRecord, getRecordByOwnerId, getRecords, updateRecord } from './record.services'

export async function createRecordHandler(
  request: FastifyRequest<{
    Body: CreateRecordInput
  }>,
  reply: FastifyReply,
) {
  const record = await createRecord({
    ...request.body,
    ownerId: request.user.id,
  })
  return reply.code(201).send(record)
}

export async function updateRecordHandler(
  request: FastifyRequest<{
    Body: UpdateRecordInput
  }>,
) {
  const record = await updateRecord({
    ...request.body,
    ownerId: request.user.id,
  })
  if (!record) {
    throw new Error(`The user with id ${request.user.id} doesn not have a Record associated with them`, {
      cause: 409,
    })
  }
  return record
}

export async function deleteRecordHandler(request: FastifyRequest, reply: FastifyReply) {
  await deleteRecord(request.user.id)
  reply.code(204)
}

export async function getRecordByOwnerIdHandler(
  request: FastifyRequest<{
    Params: GetRecordByOwnderIdInput
  }>,
  reply: FastifyReply,
) {
  const records = await getRecordByOwnerId({ ...request.params })
  return reply.code(200).send(records)
}

export async function getRecordsHandler(
  request: FastifyRequest<{
    Querystring: GetRecordsInput
  }>,
  reply: FastifyReply,
) {
  const records = await getRecords({ ...request.query })
  return reply.code(200).send(records)
}
