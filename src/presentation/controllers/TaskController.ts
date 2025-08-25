import type { Request, Response } from 'express'
import { TaskApplicationService } from '@/application/services/TaskApplicationService'
import { BadRequestError, NotFoundError } from '@/shared/helpers/ApiErrors'

export class TaskController {
  taskApplicationService: TaskApplicationService

  constructor() {
    this.taskApplicationService = new TaskApplicationService()
  }

  async createTask(req: Request, res: Response) {
    const { body } = req
    const { user } = res.locals
    if (!user) throw new NotFoundError('Usuário não encontrado')

    const result = await this.taskApplicationService.createTask(body, user)

    res.status(200).json({
      task: result
    })
  }

  async updateTask(req: Request, res: Response) {
    const { body } = req
    const { id } = req.params
    if (!id) throw new BadRequestError('Id não informado')
    const { user } = res.locals
    if (!user) throw new NotFoundError('Usuário não encontrado')

    const result = await this.taskApplicationService.updateTask(body, id, user)

    res.status(200).json({
      task: {
        id: result.id
      }
    })
  }

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params
    if (!id) throw new BadRequestError('Id não informado')
    const { user } = res.locals
    if (!user) throw new NotFoundError('Usuário não encontrado')

    await this.taskApplicationService.deleteTask(id, user)

    res.status(204).json()
  }

  async deleteCompletedTasks(_req: Request, res: Response) {
    const { user } = res.locals
    if (!user) throw new NotFoundError('Usuário não encontrado')

    await this.taskApplicationService.deleteCompletedTasks(user.id)

    res.status(204).json()
  }
}
