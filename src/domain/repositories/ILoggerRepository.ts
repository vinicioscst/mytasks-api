import type {
  IEmailLogPayload,
  IErrorLogPayload
} from '@/shared/types/logger-payload'

export interface ILoggerRepository {
  createEmailLog(payload: IEmailLogPayload): Promise<void>
  createErrorLog(payload: IErrorLogPayload): Promise<void>
}
