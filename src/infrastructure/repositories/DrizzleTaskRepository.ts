import { Task } from '@/domain/entities/task'
import { ITaskRepository } from '@/domain/repositories/ITaskRepository'
import { db } from '../data'
import { tasksTable } from '../data/schemas'
import { eq } from 'drizzle-orm'

export class DrizzleTaskRepository implements ITaskRepository {
  constructor() {}

  async findById(findByUserId: boolean, id: string): Promise<Task | null> {
    const task = await db.query.tasksTable.findFirst({
      where: eq(findByUserId ? tasksTable.userId : tasksTable.id, id)
    })

    if (!task) return null

    return new Task(
      task.id,
      task.title,
      task.description,
      task.dueDate,
      task.isCompleted,
      task.userId
    )
  }

  async save(task: Task): Promise<void> {
    await db.update(tasksTable).set(task).where(eq(tasksTable.id, task.id))
  }

  async delete(id: string): Promise<void> {
    await db.delete(tasksTable).where(eq(tasksTable.id, id))
  }
}
