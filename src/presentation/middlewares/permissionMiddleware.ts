import { Request, Response, NextFunction } from 'express'
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError
} from '@/shared/helpers/ApiErrors'

export async function permissionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { user } = res.locals
  if (!user) throw new UnauthorizedError('Token ausente')

  const { id } = req.params
  if (!id) throw new BadRequestError('Id não informado')

  const isUser = user.id === id
  const isUserTask = user.tasks.some(
    (task) => task.id === id && task.userId === user.id
  )

  if (!isUser && !isUserTask) throw new ForbiddenError('Acesso não permitido')

  next()
}
