import { TCreateUserRequestDTO } from '@/presentation/dtos/user/CreateUserRequestDTO'
import { IUserRepository } from '../repositories/IUserRepository'
import { DrizzleUserRepository } from '@/infrastructure/repositories/DrizzleUserRepository'
import { hash } from 'bcryptjs'
import { ConflictError, NotFoundError } from '@/shared/helpers/ApiErrors'
import { TUpdateUserRequestDTO } from '@/presentation/dtos/user/UpdateUserRequestDTO'
import { createHash } from 'node:crypto'
import { generateToken } from '@/shared/actions/generate-token'

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

    const hashGenerator = createHash('sha256')
    const avatar = hashGenerator
      .update(userData.email.toLowerCase())
      .digest('hex')

    const newUser = await this.userRepository.create({
      ...userData,
      avatar: `https://gravatar.com/avatar/${avatar}`
    })

    return newUser
  }

  async updateUser(userData: TUpdateUserRequestDTO, userId: string) {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new NotFoundError('Usuário não encontrado')

    let accessToken = null

    if (userData.password) {
      userData.password = await hash(userData.password, 10)
    }

    if (userData.email) {
      const hashGenerator = createHash('sha256')
      const avatar = hashGenerator
        .update(userData.email.toLowerCase())
        .digest('hex')

      userData.avatar = `https://gravatar.com/avatar/${avatar}`

      accessToken = generateToken({ id: user.id, email: userData.email }, '15m')
    }

    user.updateUser(userData)

    await this.userRepository.save(user)

    return { user, ...(accessToken && { accessToken }) }
  }

  async deleteUser(userId: string) {
    await this.userRepository.findById(userId)
    await this.userRepository.delete(userId)
  }
}
