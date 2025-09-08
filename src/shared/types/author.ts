import type { Task } from '@/domain/entities/task'

export interface Author {
  id: string
  name: string
  email: string
  avatar: string
  tasks: Task[]
}
