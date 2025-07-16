import { User } from '@/domain/entities/User'
import { IUserRepository } from '@/domain/repositories/IUserRepository'
import { db } from '../data'
import { usersTable } from '../data/schemas'
import { eq } from 'drizzle-orm'
import { TCreateUserRequestDTO } from '@/presentation/dtos/user/CreateUserRequestDTO'
import { Task } from '@/domain/entities/Task'
import { ApiError, NotFoundError } from '@/shared/helpers/ApiErrors'

export class DrizzleUserRepository implements IUserRepository {
  constructor() {}

  async findById(id: string): Promise<User> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      with: {
        tasks: true
      }
    })

    if (!user) throw new NotFoundError('Usuário não encontrado')

    const tasks = user.tasks.map((task) => {
      if (!task) {
        return task
      }

      return new Task(
        task.id,
        task.title,
        task.description,
        task.dueDate,
        task.isCompleted,
        task.userId
      )
    })

    return new User(user.id, user.name, user.email, user.password, tasks)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      with: {
        tasks: true
      }
    })

    if (!user) return null

    const tasks = user.tasks.map((task) => {
      if (!task) {
        return task
      }

      return new Task(
        task.id,
        task.title,
        task.description,
        task.dueDate,
        task.isCompleted,
        task.userId
      )
    })

    return new User(user.id, user.name, user.email, user.password, tasks)
  }

  async create(user: TCreateUserRequestDTO): Promise<User> {
    const [newUser] = await db.insert(usersTable).values(user).returning()
    if (!newUser) {
      throw new ApiError('Falha ao criar o usuário', 500)
    }

    const userWithTasks = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, newUser.id),
      with: { tasks: true }
    })
    if (!userWithTasks) {
      throw new NotFoundError('Usuário não encontrado')
    }

    const tasks = userWithTasks.tasks.map((task) => {
      if (!task) {
        return task
      }

      return new Task(
        task.id,
        task.title,
        task.description,
        task.dueDate,
        task.isCompleted,
        task.userId
      )
    })

    return new User(
      userWithTasks.id,
      userWithTasks.name,
      userWithTasks.email,
      userWithTasks.password,
      tasks
    )
  }

  async save(user: User): Promise<void> {
    await db.update(usersTable).set(user).where(eq(usersTable.id, user.id))
  }

  async delete(id: string): Promise<void> {
    await db.delete(usersTable).where(eq(usersTable.id, id))
  }
}
