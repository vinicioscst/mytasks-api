import type { TCreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'
import type { Task } from '../entities/task'

export interface ITaskRepository {
  findById(id: string): Promise<Task>
  create(task: TCreateTaskRequestDTO, userId: string): Promise<Task>
  save(task: Task): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(userId: string): Promise<void>
}
