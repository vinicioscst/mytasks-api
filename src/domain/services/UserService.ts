import { TCreateUserRequestDTO } from '@/presentation/dtos/user/CreateUserRequestDTO'
import { IUserRepository } from '../repositories/IUserRepository'
import { DrizzleUserRepository } from '@/infrastructure/repositories/DrizzleUserRepository'
import { hash } from 'bcryptjs'

export class UserService {
  userRepository: IUserRepository

  constructor() {
    this.userRepository = new DrizzleUserRepository()
  }

  async createUser(userData: TCreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(
      userData.email
    )

    if (userAlreadyExists) {
      throw new Error('Email já utilizado')
    }

    userData.password = await hash(userData.password, 13)

    const newUser = await this.userRepository.create(userData)

    return newUser
  }
}
