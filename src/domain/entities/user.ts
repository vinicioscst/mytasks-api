import type { TUpdateUserRequestDTO } from '@/presentation/dtos/user/UpdateUserRequestDTO'
import type { Task } from './task'

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public avatar: string,
    public password: string,
    public tasks: Task[]
  ) {}

  updateUser(data: TUpdateUserRequestDTO) {
    Object.assign(this, data)
  }
}
