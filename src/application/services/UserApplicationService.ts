import { UserService } from '@/domain/services/UserService'
import { welcomeTemplate } from '@/infrastructure/email/templates/welcome-template'
import { publishToQueue } from '@/infrastructure/rabbitmq/rabbitmq'
import { CreateUserRequestDTO } from '@/presentation/dtos/user/CreateUserRequestDTO'
import { CreateUserResponseDTO } from '@/presentation/dtos/user/CreateUserResponseDTO'
import { UpdateUserRequestDTO } from '@/presentation/dtos/user/UpdateUserRequestDTO'
import { UpdateUserResponseDTO } from '@/presentation/dtos/user/UpdateUserResponseDTO'

export class UserApplicationService {
  userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async createUser(body: unknown) {
    const parsedBody = CreateUserRequestDTO.parse(body)
    const newUser = await this.userService.createUser(parsedBody)

    const welcomeEmailPayload = {
      to: newUser.email,
      subject: 'Bem-vindo ao MyTasksApp!',
      html: welcomeTemplate(newUser.name)
    }
    await publishToQueue('email_queue', welcomeEmailPayload)

    const response = CreateUserResponseDTO.parse(newUser)

    return response
  }

  async updateUser(body: unknown, id: string) {
    const parsedBody = UpdateUserRequestDTO.parse(body)
    const newUser = await this.userService.updateUser(parsedBody, id)
    const response = UpdateUserResponseDTO.parse(newUser)

    return response
  }

  async deleteUser(id: string) {
    await this.userService.deleteUser(id)
  }
}
