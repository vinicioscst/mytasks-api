import { DrizzleTaskRepository } from '@/infrastructure/repositories/DrizzleTaskRepository'
import { ITaskRepository } from '../repositories/ITaskRepository'
import { TCreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'

export class TaskService {
  taskRepository: ITaskRepository

  constructor() {
    this.taskRepository = new DrizzleTaskRepository()
  }

  async createTask(taskData: TCreateTaskRequestDTO, userId: string) {
    const newTask = await this.taskRepository.create(taskData, userId)

    return newTask
  }
}
