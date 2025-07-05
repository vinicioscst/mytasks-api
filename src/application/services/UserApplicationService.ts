import { Request } from 'express'
import { UserService } from '@/domain/services/UserService'
import { CreateUserRequestDTO } from '@/presentation/dtos/user/CreateUserRequestDTO'
import { CreateUserResponseDTO } from '@/presentation/dtos/user/CreateUserResponseDTO'
import { z, ZodError } from 'zod/v4'

export class UserApplicationService {
  userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async createUser(body: unknown) {
    try {
      const parsedBody = CreateUserRequestDTO.parse(body)
      const newUser = await this.userService.createUser(parsedBody)
      const response = CreateUserResponseDTO.parse(newUser)

      return { success: true, data: response }
    } catch (error) {
      const errorMessage =
        error instanceof ZodError
          ? z.prettifyError(error)
          : (error as Error).message

      return { success: false, error: errorMessage }
    }
  }
}
