import { Request, Response } from 'express'
import { UserApplicationService } from '@/application/services/UserApplicationService'
import { BadRequestError, NotFoundError } from '@/shared/helpers/ApiErrors'
import { generateToken } from '@/shared/actions/generate-token'
import { verify } from 'jsonwebtoken'
import { env } from '@/shared/config/env'
import { TokenPayload } from '@/shared/types/token-payload'

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

  async logoutUser(_req: Request, res: Response) {
    const { user } = res.locals
    if (!user) throw new NotFoundError('Usuário não encontrado')

    res
      .status(204)
      .cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
      })
      .end()
  }

  async updateUser(req: Request, res: Response) {
    const { body } = req
    const { id } = req.params
    if (!id) throw new BadRequestError('Id não informado')

    const result = await this.userApplicationService.updateUser(body, id)

    if (res.locals.user!.email !== result.email) {
      const tokenExpiration = 60 * 60 * 24
      const token = generateToken(result.id, result.email, tokenExpiration)

      const { exp } = verify(token, env.JWT_SECRET) as TokenPayload

      res
        .status(200)
        .cookie('token', token, {
          httpOnly: true,
          expires: new Date(exp * 1000)
        })
        .json(result)
    } else {
      res.status(200).json(result)
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params
    if (!id) throw new BadRequestError('Id não informado')

    await this.userApplicationService.deleteUser(id)

    res.status(204).json()
  }
}
