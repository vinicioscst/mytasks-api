import { UserService } from '@/domain/services/UserService'
import { CreateUserRequestDTO } from '@/presentation/dtos/user/CreateUserRequestDTO'
import { CreateUserResponseDTO } from '@/presentation/dtos/user/CreateUserResponseDTO'

export class UserApplicationService {
  userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async createUser(body: unknown) {
    const parsedBody = CreateUserRequestDTO.parse(body)
    const newUser = await this.userService.createUser(parsedBody)
    const response = CreateUserResponseDTO.parse(newUser)

    return response
  }
}
