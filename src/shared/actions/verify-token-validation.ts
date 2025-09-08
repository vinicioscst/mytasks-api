import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { UnauthorizedError } from '../helpers/ApiErrors'
import type { ITokenPayload } from '../types/token-payload'

export function verifyTokenValidation(token: string, isRefreshToken: boolean) {
  try {
    const { id, email, type } = jwt.verify(
      token,
      env.JWT_SECRET
    ) as ITokenPayload

    return { id, email, ...(type && { type: type }) }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      if (isRefreshToken) {
        throw new UnauthorizedError('Token expirado')
      } else {
        return null
      }
    }

    if (error instanceof jwt.JsonWebTokenError) {
      if (isRefreshToken) {
        throw new jwt.JsonWebTokenError(error.message)
      } else {
        return null
      }
    }
  }
}
