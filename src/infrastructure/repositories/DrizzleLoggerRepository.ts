import type { ILoggerRepository } from '@/domain/repositories/ILoggerRepository'
import type {
  IEmailLogPayload,
  IErrorLogPayload
} from '@/shared/types/logger-payload'
import { db } from '../data'
import { emailsLogTable, errorsLogTable } from '../data/schemas'

export class DrizzleLoggerRepository implements ILoggerRepository {
  async createEmailLog(payload: IEmailLogPayload): Promise<void> {
    await db.insert(emailsLogTable).values(payload)
  }

  async createErrorLog(payload: IErrorLogPayload): Promise<void> {
    await db.insert(errorsLogTable).values(payload)
  }
}
