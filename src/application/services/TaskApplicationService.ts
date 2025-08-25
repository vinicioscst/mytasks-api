import type { Task } from '@/domain/entities/Task'
import { TaskService } from '@/domain/services/TaskService'
import { deleteTaskTemplate } from '@/infrastructure/email/templates/delete-task-template'
import { newTaskTemplate } from '@/infrastructure/email/templates/new-task-template'
import { updateTaskTemplate } from '@/infrastructure/email/templates/update-task-template'
import { publishToQueue } from '@/infrastructure/rabbitmq/rabbitmq'
import { CreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'
import { CreateTaskResponseDTO } from '@/presentation/dtos/task/CreateTaskResponseDTO'
import { UpdateTaskRequestDTO } from '@/presentation/dtos/task/UpdateTaskRequestDTO'
import { UpdateTaskResponseDTO } from '@/presentation/dtos/task/UpdateTaskResponseDTO'

interface Author {
  id: string
  name: string
  email: string
  avatar: string
  tasks: Task[]
}

export class TaskApplicationService {
  taskService: TaskService

  constructor() {
    this.taskService = new TaskService()
  }

  async createTask(body: unknown, author: Author) {
    const parsedBody = CreateTaskRequestDTO.parse(body)
    const newTask = await this.taskService.createTask(parsedBody, author.id)

    const creationEmailPayload = {
      to: author.email,
      subject: `Nova Tarefa Criada: ${newTask.title}`,
      html: newTaskTemplate(author.name, newTask)
    }
    await publishToQueue('task_notification_queue', creationEmailPayload)

    const response = CreateTaskResponseDTO.parse(newTask)

    return response
  }

  async updateTask(body: unknown, id: string, author: Author) {
    const parsedBody = UpdateTaskRequestDTO.parse(body)
    const updatedTask = await this.taskService.updateTask(parsedBody, id)
    const response = UpdateTaskResponseDTO.parse(updatedTask)

    const updateEmailPayload = {
      to: author.email,
      subject: `Tarefa Atualizada: ${updatedTask.title}`,
      html: updateTaskTemplate(author.name, updatedTask)
    }
    await publishToQueue('task_notification_queue', updateEmailPayload)

    return response
  }

  async deleteTask(id: string, author: Author) {
    const deletedTask = await this.taskService.deleteTask(id)

    const deletionEmailPayload = {
      to: author.email,
      subject: `Tarefa Excluída: ${deletedTask.title}`,
      html: deleteTaskTemplate(author.name, deletedTask)
    }
    await publishToQueue('task_notification_queue', deletionEmailPayload)
  }

  async deleteCompletedTasks(userId: string) {
    await this.taskService.deleteCompletedTasks(userId)
  }
}
