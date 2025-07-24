import { sign } from 'jsonwebtoken'
import { env } from '../config/env'

export function generateToken(
  id: string,
  email: string,
  expiration: number
): string {
  const token = sign(
    {
      id,
      email
    },
    env.JWT_SECRET,
    {
      expiresIn: expiration
    }
  )

  return token
}
