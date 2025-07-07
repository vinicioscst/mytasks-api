import { Request, Response } from 'express'
import { UserApplicationService } from '@/application/services/UserApplicationService'

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
}
