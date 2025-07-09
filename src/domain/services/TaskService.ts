import { DrizzleTaskRepository } from '@/infrastructure/repositories/DrizzleTaskRepository'
import { ITaskRepository } from '../repositories/ITaskRepository'
import { TCreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'
import { TUpdateTaskRequestDTO } from '@/presentation/dtos/task/UpdateTaskRequestDTO'
import { Task } from '../entities/Task'

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

  async updateTask(taskData: TUpdateTaskRequestDTO, taskId: string) {
    const task = (await this.taskRepository.findById(false, taskId)) as Task

    task.updateTask(taskData)

    await this.taskRepository.save(task)

    return task
  }
}
