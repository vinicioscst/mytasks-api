import { AuthApplicationService } from '@/application/services/AuthApplicationService'
import { env } from '@/shared/config/env'
import { TokenPayload } from '@/shared/types/token-payload'
import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export class AuthController {
  authApplicationService: AuthApplicationService

  constructor() {
    this.authApplicationService = new AuthApplicationService()
  }

  async login(req: Request, res: Response) {
    const { body } = req
    const { user, accessToken, refreshToken } =
      await this.authApplicationService.login(body)

    const { exp } = verify(refreshToken, env.JWT_SECRET) as TokenPayload

    res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(exp * 1000)
      })
      .json({ user, accessToken })
  }
}
