import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'
import { env } from '../config/env'
import { TokenPayload } from '../types/token-payload'
import { UnauthorizedError } from '../helpers/ApiErrors'

export function verifyTokenValidation(token: string, isRefreshToken: boolean) {
  try {
    const { id, email, type } = verify(token, env.JWT_SECRET) as TokenPayload

    return { id, email, ...(type && { type: type }) }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      if (isRefreshToken) {
        throw new UnauthorizedError('Token expirado')
      } else {
        return null
      }
    }

    if (error instanceof JsonWebTokenError) {
      if (isRefreshToken) {
        throw new JsonWebTokenError(error.message)
      } else {
        return null
      }
    }
  }
}
