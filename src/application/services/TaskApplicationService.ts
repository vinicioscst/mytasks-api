import { TaskService } from '@/domain/services/TaskService'
import { CreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'
import { CreateTaskResponseDTO } from '@/presentation/dtos/task/CreateTaskResponseDTO'
import {
  ReadAllTasksResponseDTO,
  ReadTaskResponseDTO
} from '@/presentation/dtos/task/ReadTaskResponseDTO'

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

  async readTask(taskId: string) {
    const task = await this.taskService.readTask(taskId)
    const response = ReadTaskResponseDTO.parse(task)

    return response
  }
}
