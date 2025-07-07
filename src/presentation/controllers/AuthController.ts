import { AuthApplicationService } from '@/application/services/AuthApplicationService'
import { Request, Response } from 'express'

export class AuthController {
  authApplicationService: AuthApplicationService

  constructor() {
    this.authApplicationService = new AuthApplicationService()
  }

  async login(req: Request, res: Response) {
    const { body } = req
    const result = await this.authApplicationService.login(body)

    res.status(200).json(result)
  }
}
