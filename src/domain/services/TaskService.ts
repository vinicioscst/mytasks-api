import { DrizzleTaskRepository } from '@/infrastructure/repositories/DrizzleTaskRepository'
import type { TCreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'
import type { TUpdateTaskRequestDTO } from '@/presentation/dtos/task/UpdateTaskRequestDTO'
import type { ITaskRepository } from '../repositories/ITaskRepository'

export class TaskService {
  taskRepository: ITaskRepository

  constructor() {
    this.taskRepository = new DrizzleTaskRepository()
  }

  async createTask(taskData: TCreateTaskRequestDTO, userId: string) {
    const newTask = await this.taskRepository.create(taskData, userId)

    return newTask
  }

  async updateTask(taskData: TUpdateTaskRequestDTO, id: string) {
    const task = await this.taskRepository.findById(id)

    task.updateTask(taskData)

    await this.taskRepository.save(task)

    return task
  }

  async deleteTask(id: string) {
    const task = await this.taskRepository.findById(id)
    await this.taskRepository.delete(task.id)

    return task
  }

  async deleteCompletedTasks(userId: string) {
    await this.taskRepository.delete(userId)
  }
}
