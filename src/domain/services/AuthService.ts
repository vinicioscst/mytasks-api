import { IUserRepository } from '../repositories/IUserRepository'
import { DrizzleUserRepository } from '@/infrastructure/repositories/DrizzleUserRepository'
import { TUserLoginRequestDTO } from '@/presentation/dtos/auth/UserLoginRequestDTO'
import { env } from '@/shared/config/env'
import { UnauthorizedError } from '@/shared/helpers/ApiErrors'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class AuthService {
  userRepository: IUserRepository

  constructor() {
    this.userRepository = new DrizzleUserRepository()
  }

  async login(loginData: TUserLoginRequestDTO) {
    const user = await this.userRepository.findByEmail(loginData.email)
    if (!user) throw new UnauthorizedError('Credenciais inválidas')

    const passwordMatches = await compare(loginData.password, user.password)
    if (!passwordMatches) throw new UnauthorizedError('Credenciais inválidas')

    const token = sign(
      {
        id: user.id,
        email: user.email
      },
      env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )

    return { user, token }
  }
}
