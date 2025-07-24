import { TaskService } from '@/domain/services/TaskService'
import { CreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'
import { CreateTaskResponseDTO } from '@/presentation/dtos/task/CreateTaskResponseDTO'
import {
  ReadAllTasksResponseDTO,
  ReadTaskResponseDTO
} from '@/presentation/dtos/task/ReadTaskResponseDTO'
import { UpdateTaskRequestDTO } from '@/presentation/dtos/task/UpdateTaskRequestDTO'
import { UpdateTaskResponseDTO } from '@/presentation/dtos/task/UpdateTaskResponseDTO'

export class TaskApplicationService {
  taskService: TaskService

  constructor() {
    this.taskService = new TaskService()
  }

  async createTask(body: unknown, userId: string) {
    const parsedBody = CreateTaskRequestDTO.parse(body)
    const newUser = await this.taskService.createTask(parsedBody, userId)
    const response = CreateTaskResponseDTO.parse(newUser)

    return response
  }

  async readAllTasks(userId: string) {
    const allTasks = await this.taskService.readAllTaks(userId)
    const response = ReadAllTasksResponseDTO.parse(allTasks)

    return response
  }

  async readTask(id: string) {
    const task = await this.taskService.readTask(id)
    const response = ReadTaskResponseDTO.parse(task)

    return response
  }

  async updateTask(body: unknown, id: string) {
    const parsedBody = UpdateTaskRequestDTO.parse(body)
    const task = await this.taskService.updateTask(parsedBody, id)
    const response = UpdateTaskResponseDTO.parse(task)

    return response
  }

  async deleteTask(id: string) {
    await this.taskService.deleteTask(id)
  }

  async deleteCompletedTasks(userId: string) {
    await this.taskService.deleteCompletedTasks(userId)
  }
}
