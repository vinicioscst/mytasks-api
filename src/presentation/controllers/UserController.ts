import { Request, Response } from 'express'
import { UserApplicationService } from '@/application/services/UserApplicationService'
import { BadRequestError, NotFoundError } from '@/shared/helpers/ApiErrors'

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

    res.status(200).json({
      user
    })
  }

  async logoutUser(_req: Request, res: Response) {
    const { user } = res.locals
    if (!user) throw new NotFoundError('Usuário não encontrado')

    res
      .status(204)
      .cookie('refreshToken', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
      })
      .end()
  }

  async updateUser(req: Request, res: Response) {
    const { body } = req
    const { id } = req.params
    if (!id) throw new BadRequestError('Id não informado')

    const result = await this.userApplicationService.updateUser(body, id)

    res.status(200).json(result)
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params
    if (!id) throw new BadRequestError('Id não informado')

    await this.userApplicationService.deleteUser(id)

    res.status(204).json()
  }
}
