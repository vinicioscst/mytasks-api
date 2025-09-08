import { DrizzleLoggerRepository } from '@/infrastructure/repositories/DrizzleLoggerRepository'
import type {
  IEmailLogPayload,
  IErrorLogPayload
} from '@/shared/types/logger-payload'
import type { ILoggerRepository } from '../repositories/ILoggerRepository'

export class LoggerService {
  loggerRepository: ILoggerRepository

  constructor() {
    this.loggerRepository = new DrizzleLoggerRepository()
  }

  async createEmailLog(emailInfo: IEmailLogPayload) {
    await this.loggerRepository.createEmailLog(emailInfo)
  }

  async createErrorLog(errorInfo: IErrorLogPayload) {
    await this.loggerRepository.createErrorLog(errorInfo)
  }
}
