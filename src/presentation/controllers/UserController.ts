import { Request, Response } from 'express'
import { UserApplicationService } from '@/application/services/UserApplicationService'
import { NotFoundError } from '@/shared/helpers/ApiErrors'

export class UserController {
  userApplicationService: UserApplicationService

  constructor() {
    this.userApplicationService = new UserApplicationService()
  }

  async createUser(req: Request, res: Response) {
    const { body } = req
    const result = await this.userApplicationService.createUser(body)

    res.status(201).json(result)
  }

  async readUser(_req: Request, res: Response) {
    const { user } = res.locals
    if (!user) throw new NotFoundError('Usuário não encontrado')

    res.status(200).json(user)
  }
}
