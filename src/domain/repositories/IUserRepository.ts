import { TCreateUserRequestDTO } from '@/presentation/dtos/user/CreateUserRequestDTO'
import { User } from '../entities/User'

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: TCreateUserRequestDTO): Promise<User>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
}
