import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { TokenPayload } from '../types/token-payload'
import { UnauthorizedError } from '../helpers/ApiErrors'

export function verifyTokenValidation(token: string, isRefreshToken: boolean) {
  try {
    const { id, email, type } = jwt.verify(
      token,
      env.JWT_SECRET
    ) as TokenPayload

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
