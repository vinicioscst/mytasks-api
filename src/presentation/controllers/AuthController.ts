import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthApplicationService } from '@/application/services/AuthApplicationService'
import { env } from '@/shared/config/env'
import { NotFoundError } from '@/shared/helpers/ApiErrors'
import type { ITokenPayload } from '@/shared/types/token-payload'

export class AuthController {
  authApplicationService: AuthApplicationService

  constructor() {
    this.authApplicationService = new AuthApplicationService()
  }

  async login(req: Request, res: Response) {
    const { body } = req
    const { user, accessToken, refreshToken } =
      await this.authApplicationService.login(body)

    const { exp } = jwt.verify(refreshToken, env.JWT_SECRET) as ITokenPayload

    res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(exp * 1000)
      })
      .json({ user, accessToken })
  }

  async logout(_req: Request, res: Response) {
    const { user } = res.locals
    if (!user) throw new NotFoundError('Usuário não encontrado', 'controller')

    res
      .status(204)
      .cookie('refreshToken', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
      })
      .end()
  }
}
