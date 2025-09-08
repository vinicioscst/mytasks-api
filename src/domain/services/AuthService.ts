import { compare } from 'bcryptjs'
import { DrizzleUserRepository } from '@/infrastructure/repositories/DrizzleUserRepository'
import type { TUserLoginRequestDTO } from '@/presentation/dtos/auth/UserLoginRequestDTO'
import { generateToken } from '@/shared/actions/generate-token'
import { UnauthorizedError } from '@/shared/helpers/ApiErrors'
import type { IUserRepository } from '../repositories/IUserRepository'

export class AuthService {
  userRepository: IUserRepository

  constructor() {
    this.userRepository = new DrizzleUserRepository()
  }

  async login(loginData: TUserLoginRequestDTO) {
    const user = await this.userRepository.findByEmail(loginData.email)
    if (!user)
      throw new UnauthorizedError('Credenciais inválidas', 'AuthService')

    const passwordMatches = await compare(loginData.password, user.password)
    if (!passwordMatches)
      throw new UnauthorizedError('Credenciais inválidas', 'AuthService')

    const accessToken = generateToken({ id: user.id, email: user.email }, '15m')
    const refreshToken = generateToken(
      { id: user.id, email: user.email, type: 'refresh' },
      '7d'
    )

    return { user, accessToken, refreshToken }
  }
}
