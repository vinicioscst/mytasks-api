import { Task } from '../entities/task'

export interface ITaskRepository {
  findById(id: string): Promise<Task | null>
  findByUserId(userId: string): Promise<Task | null>
  save(task: Task): Promise<Task | null>
  delete(id: string): Promise<boolean | null>
}
