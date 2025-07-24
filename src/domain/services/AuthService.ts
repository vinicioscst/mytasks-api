import { IUserRepository } from '../repositories/IUserRepository'
import { DrizzleUserRepository } from '@/infrastructure/repositories/DrizzleUserRepository'
import { TUserLoginRequestDTO } from '@/presentation/dtos/auth/UserLoginRequestDTO'
import { generateToken } from '@/shared/actions/generate-token'
import { UnauthorizedError } from '@/shared/helpers/ApiErrors'
import { compare } from 'bcryptjs'

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

    const tokenExpiration = 60 * 60 * 24

    const token = generateToken(user.id, user.email, tokenExpiration)

    return { user, token }
  }
}
