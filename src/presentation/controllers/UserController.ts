import { Request, Response } from 'express'
import { UserApplicationService } from '@/application/services/UserApplicationService'

export class UserController {
  userApplicationService: UserApplicationService

  constructor() {
    this.userApplicationService = new UserApplicationService()
  }

  async createUser(request: Request, response: Response) {
    const { body } = request
    const result = await this.userApplicationService.createUser(body)

    if (result.success) {
      response.status(201).json(result.data)
    } else {
      response.status(400).json({ error: result.error })
    }
  }
}
