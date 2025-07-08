import { TCreateUserRequestDTO } from '@/presentation/dtos/user/CreateUserRequestDTO'
import { IUserRepository } from '../repositories/IUserRepository'
import { DrizzleUserRepository } from '@/infrastructure/repositories/DrizzleUserRepository'
import { hash } from 'bcryptjs'
import { ConflictError, NotFoundError } from '@/shared/helpers/ApiErrors'
import { TUpdateUserRequestDTO } from '@/presentation/dtos/user/UpdateUserRequestDTO'

export class UserService {
  userRepository: IUserRepository

  constructor() {
    this.userRepository = new DrizzleUserRepository()
  }

  async createUser(userData: TCreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(
      userData.email
    )

    if (userAlreadyExists) throw new ConflictError('Email já utilizado')

    userData.password = await hash(userData.password, 10)

    const newUser = await this.userRepository.create(userData)

    return newUser
  }

  async updateUser(userData: TUpdateUserRequestDTO, userId: string) {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new NotFoundError('Usuário não encontrado')

    if (userData.password) {
      userData.password = await hash(userData.password, 10)
    }

    user.updateUser(userData)

    await this.userRepository.save(user)

    return user
  }

  async deleteUser(userId: string) {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new NotFoundError('Usuário não encontrado')

    await this.userRepository.delete(userId)
  }
}
