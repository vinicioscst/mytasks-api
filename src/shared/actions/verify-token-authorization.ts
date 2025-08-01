import { DrizzleUserRepository } from '@/infrastructure/repositories/DrizzleUserRepository'
import { UnauthorizedError } from '../helpers/ApiErrors'

export async function verifyTokenAuthorization(id: string, email: string) {
  const user = await new DrizzleUserRepository().findById(id)
  if (!user || user.email !== email)
    throw new UnauthorizedError('Token inválido')

  return user
}
