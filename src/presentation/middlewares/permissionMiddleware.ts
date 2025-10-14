import type { NextFunction, Request, Response } from 'express'
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
  if (!user)
    throw new UnauthorizedError('Token ausente', 'permissionMiddleware')

  const { id } = req.params
  if (!id) throw new BadRequestError('Id não informado', 'permissionMiddleware')

  const isUserTask = user.tasks.some(
    (task) => task.id === id && task.userId === user.id
  )

  if (!isUserTask)
    throw new ForbiddenError('Acesso não permitido', 'permissionMiddleware')

  next()
}
