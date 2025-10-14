import type { TCreateUserRequestWithAvatarDTO } from '@/presentation/dtos/user/CreateUserRequestDTO'
import type { User } from '../entities/user'

export interface IUserRepository {
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User | null>
  create(user: TCreateUserRequestWithAvatarDTO): Promise<User>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
}
