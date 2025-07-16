import { AuthApplicationService } from '@/application/services/AuthApplicationService'
import { env } from '@/shared/config/env'
import { TokenPayload } from '@/shared/types/token-payload'
import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { createHash } from 'node:crypto'

export class AuthController {
  authApplicationService: AuthApplicationService

  constructor() {
    this.authApplicationService = new AuthApplicationService()
  }

  async login(req: Request, res: Response) {
    const { body } = req
    const result = await this.authApplicationService.login(body)

    const { exp } = verify(result.token, env.JWT_SECRET) as TokenPayload

    const hash = createHash('sha256')
    const avatar = hash.update(result.user.email.toLowerCase()).digest('hex')

    res
      .status(200)
      .cookie('token', result.token, {
        httpOnly: true,
        expires: new Date(exp * 1000)
      })
      .json({ ...result.user, avatar: `https://gravatar.com/avatar/${avatar}` })
  }
}
