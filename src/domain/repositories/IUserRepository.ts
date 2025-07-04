import { User } from '../entities/user'

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<User | null>
  delete(id: string): Promise<boolean | null>
}
