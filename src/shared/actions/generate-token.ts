import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import ms from 'ms'

interface IPayload {
  id: string
  email: string
  type?: 'refresh'
}

export function generateToken(
  payload: IPayload,
  expiresIn: number | ms.StringValue | undefined
) {
  const token = jwt.sign(
    {
      ...payload
    },
    env.JWT_SECRET,
    {
      expiresIn
    }
  )

  return token
}
