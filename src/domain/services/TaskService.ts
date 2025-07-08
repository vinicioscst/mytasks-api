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

  async readAllTaks(userId: string) {
    const tasks = await this.taskRepository.findById(true, userId)

    return tasks
  }

  async readTask(taskId: string) {
    const task = await this.taskRepository.findById(false, taskId)

    return task
  }
}
