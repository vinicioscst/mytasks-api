import { Task } from '@/domain/entities/Task'
import { ITaskRepository } from '@/domain/repositories/ITaskRepository'
import { db } from '../data'
import { tasksTable } from '../data/schemas'
import { eq } from 'drizzle-orm'
import { TCreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'

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

  async create(task: TCreateTaskRequestDTO, userId: string): Promise<Task> {
    const [newTask] = await db
      .insert(tasksTable)
      .values({
        ...task,
        userId
      })
      .returning()

    return new Task(
      newTask.id,
      newTask.title,
      newTask.description,
      newTask.dueDate,
      newTask.isCompleted,
      newTask.userId
    )
  }

  async save(task: Task): Promise<void> {
    await db.update(tasksTable).set(task).where(eq(tasksTable.id, task.id))
  }

  async delete(id: string): Promise<void> {
    await db.delete(tasksTable).where(eq(tasksTable.id, id))
  }
}
