import { TaskService } from '@/domain/services/TaskService'
import { CreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'
import { CreateTaskResponseDTO } from '@/presentation/dtos/task/CreateTaskResponseDTO'

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
}
