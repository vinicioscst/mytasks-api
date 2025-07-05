import { User } from '@/domain/entities/User'
import { IUserRepository } from '@/domain/repositories/IUserRepository'
import { db } from '../data'
import { tasksTable, usersTable } from '../data/schemas'
import { eq } from 'drizzle-orm'

export class DrizzleTaskRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      with: {
        tasks: true
      }
    })

    if (!user) return null

    return new User(user.id, user.name, user.email, user.password, user.tasks)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      with: {
        tasks: true
      }
    })

    if (!user) return null

    return new User(user.id, user.name, user.email, user.password, user.tasks)
  }

  async save(user: User): Promise<void> {
    await db.update(usersTable).set(user).where(eq(usersTable.id, user.id))
  }

  async delete(id: string): Promise<void> {
    await db.delete(usersTable).where(eq(usersTable.id, id))
  }
}
