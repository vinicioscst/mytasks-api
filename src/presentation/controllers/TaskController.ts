import { TaskApplicationService } from '@/application/services/TaskApplicationService'
import { BadRequestError, NotFoundError } from '@/shared/helpers/ApiErrors'
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

    res.status(200).json({
      task: result
    })
  }

  async updateTask(req: Request, res: Response) {
    const { body } = req
    const { id } = req.params
    if (!id) throw new BadRequestError('Id não informado')

    const result = await this.taskApplicationService.updateTask(body, id)

    res.status(200).json({
      task: {
        id: result.id
      }
    })
  }

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params
    if (!id) throw new BadRequestError('Id não informado')

    await this.taskApplicationService.deleteTask(id)

    res.status(204).json()
  }

  async deleteCompletedTasks(req: Request, res: Response) {
    const userId = res.locals.user!.id
    if (!userId) throw new NotFoundError('Usuário não encontrado')

    await this.taskApplicationService.deleteCompletedTasks(userId)

    res.status(204).json()
  }
}
