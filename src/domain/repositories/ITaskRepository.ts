import { Task } from '../entities/Task'

export interface ITaskRepository {
  findById(findByUserId: boolean, id: string): Promise<Task | null>
  save(task: Task): Promise<void>
  delete(id: string): Promise<void>
}
