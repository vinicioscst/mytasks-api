import { AuthService } from '@/domain/services/AuthService'
import { UserLoginRequestDTO } from '@/presentation/dtos/auth/UserLoginRequestDTO'
import { UserLoginResponseDTO } from '@/presentation/dtos/auth/UserLoginResponseDTO'

export class AuthApplicationService {
  authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  async login(body: unknown) {
    const parsedBody = UserLoginRequestDTO.parse(body)
    const loggedUser = await this.authService.login(parsedBody)
    const response = UserLoginResponseDTO.parse(loggedUser)

    return response
  }
}
