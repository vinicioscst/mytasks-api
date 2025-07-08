import { TaskApplicationService } from '@/application/services/TaskApplicationService'
import { NotFoundError } from '@/shared/helpers/ApiErrors'
import { Request, Response } from 'express'

export class TaskController {
  taskApplicationService: TaskApplicationService

  constructor() {
    this.taskApplicationService = new TaskApplicationService()
  }

  async createTask(req: Request, res: Response) {
    const { body } = req
    const { user } = res.locals
    if (!user) throw new NotFoundError('Usuário não encontrado')

    const result = await this.taskApplicationService.createTask(body, user.id)

    res.status(200).json(result)
  }
}
