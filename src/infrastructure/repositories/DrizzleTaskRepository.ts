import { Task } from '@/domain/entities/Task'
import { ITaskRepository } from '@/domain/repositories/ITaskRepository'
import { db } from '../data'
import { tasksTable } from '../data/schemas'
import { and, eq } from 'drizzle-orm'
import { TCreateTaskRequestDTO } from '@/presentation/dtos/task/CreateTaskRequestDTO'
import { NotFoundError } from '@/shared/helpers/ApiErrors'

export class DrizzleTaskRepository implements ITaskRepository {
  constructor() {}

  async findById(id: string): Promise<Task> {
    const task = await db.query.tasksTable.findFirst({
      where: eq(tasksTable.id, id)
    })
    if (!task) throw new NotFoundError('Tarefa não encontrada')

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

  async deleteMany(userId: string): Promise<void> {
    await db
      .delete(tasksTable)
      .where(
        and(eq(tasksTable.userId, userId), eq(tasksTable.isCompleted, true))
      )
  }
}
