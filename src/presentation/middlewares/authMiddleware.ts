import { DrizzleUserRepository } from '@/infrastructure/repositories/DrizzleUserRepository'
import { env } from '@/shared/config/env'
import { UnauthorizedError } from '@/shared/helpers/ApiErrors'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

type TokenPayload = {
  id: string
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { authorization } = req.headers
  if (!authorization) throw new UnauthorizedError('Token ausente')

  const token = authorization.split(' ')[1]
  if (!token) throw new UnauthorizedError('Token ausente')

  const { id } = verify(token, env.JWT_SECRET) as TokenPayload

  const user = await new DrizzleUserRepository().findById(id)
  if (!user) throw new UnauthorizedError('Token inválido')

  const { password, ...userInfo } = user
  res.locals.user = userInfo

  next()
}
