import { DrizzleUserRepository } from '@/infrastructure/repositories/DrizzleUserRepository'
import { env } from '@/shared/config/env'
import { UnauthorizedError } from '@/shared/helpers/ApiErrors'
import { TokenPayload } from '@/shared/types/token-payload'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies.token
  if (!token) throw new UnauthorizedError('Token ausente')

  const { id, email, exp } = verify(token, env.JWT_SECRET) as TokenPayload

  const expirationTime = exp * 1000
  const currentTime = Date.now()

  if (currentTime >= expirationTime)
    throw new UnauthorizedError('Token inválido')

  const user = await new DrizzleUserRepository().findById(id)
  if (!user || user.email !== email)
    throw new UnauthorizedError('Token inválido')

  const { password, ...userInfo } = user
  res.locals.user = userInfo

  next()
}
