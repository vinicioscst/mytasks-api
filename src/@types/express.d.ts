import { Task } from '@/domain/entities/Task'

declare global {
  namespace Express {
    export interface Locals {
      user:
        | {
            id: string
            name: string
            email: string
            tasks: Task[]
          }
        | undefined
    }
  }
}
