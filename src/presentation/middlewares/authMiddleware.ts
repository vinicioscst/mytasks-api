import type { NextFunction, Request, Response } from 'express'
import { generateToken } from '@/shared/actions/generate-token'
import { verifyTokenAuthorization } from '@/shared/actions/verify-token-authorization'
import { verifyTokenValidation } from '@/shared/actions/verify-token-validation'
import { UnauthorizedError } from '@/shared/helpers/ApiErrors'

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { refreshToken } = req.cookies
  const accessToken = req.headers.authorization?.replace('Bearer ', '')

  if (!refreshToken && !accessToken)
    throw new UnauthorizedError('Token ausente')

  let tokenPayload = null

  if (accessToken) {
    tokenPayload = verifyTokenValidation(accessToken, false)

    if (tokenPayload) {
      const { password, ...userInfo } = await verifyTokenAuthorization(
        tokenPayload.id,
        tokenPayload.email
      )

      res.locals.user = userInfo

      next()
    }
  }

  if (!tokenPayload && refreshToken) {
    tokenPayload = verifyTokenValidation(refreshToken, true)

    if (tokenPayload) {
      const { password, ...userInfo } = await verifyTokenAuthorization(
        tokenPayload.id,
        tokenPayload.email
      )

      const accessToken = generateToken(
        { id: userInfo.id, email: userInfo.email },
        '15m'
      )

      res.locals.user = userInfo
      res.locals.accessToken = accessToken

      next()
    }
  }
}
